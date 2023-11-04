const request = require('supertest');
const { expect } = require('chai');
const monk = require('monk');
const helpers = require('../utils/test.helpers');
require('dotenv').config();

const app = require('../app');

const routes = {
  base: '/api/shop',
  signup: '/api/auth/signup',
  upload: '/api/shop/create',
  delete: '/api/shop/delete',
};

const barberOne = {
  name: 'Best Barber',
  email: 'barber123@gmail.com',
  password: 'random123$',
  confirmPassword: 'random123$',
};

const barberTwo = {
  name: 'Worst Barber',
  email: 'barber1234@gmail.com',
  password: 'random123$',
  confirmPassword: 'random123$',
};

const newShop = {
  name: 'Teszt fodraszat',
  location: 'Nyergesujfalu',
  phone: '+36204431390',
  open: '8:00-12:00',
};

let tokenOne = '';
let tokenTwo = '';
let createdShop;

// kell egy felhasználó a további teszt esetekhez
describe(`POST ${routes.signup}`, () => {
  before(async () => {
    await helpers.clearDatabase();
  });

  it(`should create 'barberOne' user for testing`, async () => {
    const response = await request(app)
      .post(routes.signup)
      .send(barberOne)
      .expect(200);

    expect(response.body).to.have.property('token');
    tokenOne = response.body.token;
  });

  it(`should 'barberTwo' user for testing`, async () => {
    const response = await request(app)
      .post(routes.signup)
      .send(barberTwo)
      .expect(200);

    expect(response.body).to.have.property('token');
    tokenTwo = response.body.token;
  });
});

// FODRÁSZAT LÉTREHOZÁSA
describe(`POST ${routes.upload}`, () => {
  it('should not allow unauthorized users', async () => {
    const response = await request(app).post(routes.upload).expect(401);

    expect(response.body.message).to.equal('Unauthorized request!');
  });

  it('should require a name', async () => {
    const response = await request(app)
      .post(routes.upload)
      .auth(tokenOne, { type: 'bearer' })
      .expect(422);

    expect(response.body.message).to.equal('"name" is required');
  });

  it('should require a location', async () => {
    const { location, ...shop } = newShop;

    const response = await request(app)
      .post(routes.upload)
      .send(shop)
      .auth(tokenOne, { type: 'bearer' })
      .expect(422);

    expect(response.body.message).to.equal('"location" is required');
  });

  it('should require a phone number', async () => {
    const { phone, ...shop } = newShop;

    const response = await request(app)
      .post(routes.upload)
      .send(shop)
      .auth(tokenOne, { type: 'bearer' })
      .expect(422);

    expect(response.body.message).to.equal('"phone" is required');
  });

  it('should require a open', async () => {
    const { open, ...shop } = newShop;

    const response = await request(app)
      .post(routes.upload)
      .send(shop)
      .auth(tokenOne, { type: 'bearer' })
      .expect(422);

    expect(response.body.message).to.equal('"open" is required');
  });

  it('should not allow additional properties', async () => {
    const propName = 'randomProp';
    const shop = { ...newShop, [propName]: true };

    const response = await request(app)
      .post(routes.upload)
      .send(shop)
      .auth(tokenOne, { type: 'bearer' })
      .expect(422);

    expect(response.body.message).to.equal(`"${propName}" is not allowed`);
  });

  it('should create a shop', async () => {
    const response = await request(app)
      .post(routes.upload)
      .send(newShop)
      .auth(tokenOne, { type: 'bearer' })
      .expect(200);

    expect(response.body).to.have.property('newShop');
    createdShop = response.body.newShop;
  });
});

// GET ÚTVONALAK
describe(`GET ${routes.base}`, () => {
  it('should respond with the stored shops', async () => {
    const response = await request(app).get(routes.base).expect(200);

    expect(response.body.shopList).to.be.instanceOf(Array).and.lengthOf(2);
  });

  it(`should respond with the logged-in user's shops`, async () => {
    const response = await request(app)
      .get(`${routes.base}/logged-in`)
      .auth(tokenOne, {
        type: 'bearer',
      })
      .expect(200);

    expect(response.body.userShops).to.be.instanceOf(Array).and.lengthOf(1);
  });

  it('should respond with one shop', async () => {
    const response = await request(app)
      .get(`${routes.base}/${createdShop._id}`)
      .expect(200);

    expect(response.body.shop._id).to.equal(createdShop._id);
  });
});

// DELETE ÚTVONALAK
describe(`DELETE ${routes.delete}`, () => {
  // be kell lépve lennie
  // sajátját kell törölnie
  // jó id kell
  it('should not allow unauthorized users', async () => {
    const response = await request(app)
      .delete(`${routes.delete}/${createdShop._id}`)
      .expect(401);

    expect(response.body.message).to.equal('Unauthorized request!');
  });

  it(`should not allow users to delete other user's shops`, async () => {
    const response = await request(app)
      .delete(`${routes.delete}/${createdShop._id}`)
      .auth(tokenTwo, { type: 'bearer' })
      .expect(401);

    expect(response.body.message).to.equal(`You can't access this function.`);
  });

  it('should not allow invalid shopIDs', async () => {
    // a shop.middlewares-be a kód futáskor a catch ág-ba köt ki, mivel
    // a megadott id nem helyes, ezért 500 a HTTP státusz kód
    const response = await request(app)
      .delete(`${routes.delete}/invalidShopID`)
      .auth(tokenOne, { type: 'bearer' })
      .expect(500);

    expect(response.body.message).to.equal(
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    );
  });

  it(`should handle non-existing shopIDs`, async () => {
    const newId = monk.id();

    const response = await request(app)
      .delete(`${routes.delete}/${newId}`)
      .auth(tokenOne, { type: 'bearer' })
      .expect(404);

    expect(response.body.message).to.equal(
      `Couldn't find a barber shop with this ID.`,
    );
  });

  it('should delete a shop with the given id', async () => {
    const response = await request(app)
      .delete(`${routes.delete}/${createdShop._id}`)
      .auth(tokenOne, { type: 'bearer' })
      .expect(200);

    expect(response.body.message).to.equal(
      'Your barber shop got successfully deleted.',
    );
  });
});

// PATCH
