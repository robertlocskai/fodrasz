const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');

describe('GET /', () => {
  it('should respond with a message', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.body.message).to.equal('Homepage');
  });
});
