const request = require('supertest');
const { expect } = require('chai');
const helpers = require('../utils/test.helpers');
require('dotenv').config();

const app = require('../app');

const routes = {
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  validate: '/api/auth/validate',
  refreshToken: '/api/auth/refresh',
};

const newBarber = {
  name: 'Best Barber',
  email: 'barber123@gmail.com',
  password: 'random123$',
  confirmPassword: 'random123$',
};

const loginBarber = {
  email: newBarber.email,
  password: newBarber.password,
};

let token;

// Signup
describe(`POST ${routes.signup}`, () => {
  before(async () => {
    await helpers.clearDatabase();
  });

  it('should require a name', async () => {
    const { name, ...barber } = newBarber;
    const response = await request(app)
      .post(routes.signup)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal('"name" is required');
  });

  it('should require an email', async () => {
    const { email, ...barber } = newBarber;
    const response = await request(app)
      .post(routes.signup)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal('"email" is required');
  });

  it('should require an password', async () => {
    const { password, ...barber } = newBarber;
    const response = await request(app)
      .post(routes.signup)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal('"password" is required');
  });

  it('should require a confirmPassword', async () => {
    const { confirmPassword, ...barber } = newBarber;
    const response = await request(app)
      .post(routes.signup)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal('"Confirm password" is required');
  });

  it('should not have any additional properties', async () => {
    const propName = 'randomProp';
    const barber = { ...newBarber, [propName]: true };

    const response = await request(app)
      .post(routes.signup)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal(`"${propName}" is not allowed`);
  });

  it('should not allow different passwords', async () => {
    const barber = {
      ...newBarber,
      confirmPassword: 'differentPasswordThisTime',
    };

    const response = await request(app)
      .post(routes.signup)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal(
      '"Confirm password" must be [ref:password]',
    );
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post(routes.signup)
      .send(newBarber)
      .expect(200);

    expect(response.body).to.have.property('token');

    token = response.body.token;
  });

  it('should not allow multiple users', async () => {
    const response = await request(app)
      .post(routes.signup)
      .send(newBarber)
      .expect(409);

    expect(response.body.message).to.equal(
      'A megadott email cím már foglalt. Kérlek válassz másikat!',
    );
  });
});

// Login
describe(`POST ${routes.login}`, () => {
  it('should require an email', async () => {
    const { email, ...barber } = loginBarber;

    const response = await request(app)
      .post(routes.login)
      .send(barber)
      .expect(422);

    console.log(response.body);

    expect(response.body.message).to.equal('"email" is required');
  });

  it('should require an password', async () => {
    const { password, ...barber } = loginBarber;

    const response = await request(app)
      .post(routes.login)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal('"password" is required');
  });

  it('should not allow additional properties', async () => {
    const propName = 'randomProp';
    const barber = { ...loginBarber, [propName]: true };

    const response = await request(app)
      .post(routes.login)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal(`"${propName}" is not allowed`);
  });

  it('should not allow users to login with bad email address', async () => {
    const barber = { ...loginBarber, email: 'randommail@gmail.com' };

    const response = await request(app)
      .post(routes.login)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal(
      'Ilyen email címmel nem létezik fiók. Kérlek próbáld újra!',
    );
  });

  it('should not allow users to login with bad password', async () => {
    const barber = { ...loginBarber, password: '12345$' };

    const response = await request(app)
      .post(routes.login)
      .send(barber)
      .expect(422);

    expect(response.body.message).to.equal(
      'Rossz jelszót adtál meg. Kérlek próbáld újra!',
    );
  });

  it('should login', async () => {
    const response = await request(app)
      .post(routes.login)
      .send(loginBarber)
      .expect(200);

    expect(response.body).to.have.property('token');
  });
});

describe(`GET ${routes.validate}`, () => {
  it('should not accept empty tokens', async () => {
    const response = await request(app).get(routes.validate).expect(200);

    expect(response.body).to.eql({});
  });

  it('should not accept invalid tokens', async () => {
    const invalidToken = `invalid_${token}`;

    const response = await request(app)
      .get(routes.validate)
      .auth(invalidToken, { type: 'bearer' })
      .expect(200);

    expect(response.body).to.eql({});
  });

  it('should accept valid tokens', async () => {
    const response = await request(app)
      .get(routes.validate)
      .auth(token, { type: 'bearer' })
      .expect(200);

    expect(response.body).to.have.property('user');
  });
});

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

describe(`GET ${routes.refreshToken}`, () => {
  it('should not accept fresh tokens', async () => {
    const response = await request(app)
      .get(routes.refreshToken)
      .auth(token, { type: 'bearer' })
      .expect(422);

    expect(response.body.message).to.equal(
      'A megadott token még nem most fog lejárni! Kérlek próbálkozz később!',
    );
  });

  it('should respond with a fresh token', async function () {
    this.timeout(3000);
    await sleep(2000);

    const response = await request(app)
      .get(routes.refreshToken)
      .auth(token, { type: 'bearer' })
      .expect(200);

    expect(response.body).to.have.property('token');
  });

  it('should not accept already used tokens', async () => {
    const response = await request(app)
      .get(routes.refreshToken)
      .auth(token, { type: 'bearer' })
      .expect(409);

    expect(response.body.message).to.equal(
      'Ezzel a tokennel már igényeltél refresh tokent!',
    );
  });
});
