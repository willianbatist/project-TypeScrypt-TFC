import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { userMock, login, loginEmail, loginPassword, token } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves(userMock as User)
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  })

  it('login successfully', async () => {
    const response = await chai.request(app).post('/login').send(login);
    expect(response.status).to.be.equal(200);
    expect(response.body).have.property('token');
  });

  it('do not authorize login without email', async () => {
    const response = await chai.request(app).post('/login').send(loginPassword);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
  });

  it('do not authorize login without password', async () => {
    const response = await chai.request(app).post('/login').send(loginEmail);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
  });

  it('Develop the /login/validate endpoint, where the response should be of status 200 with an object containing the role property.', async () => {
    const response = await chai.request(app).get('/login/validate').set({ "Authorization": token });
    expect(response.status).to.be.equal(200);
    expect(response.body).have.property('role');
  });
});