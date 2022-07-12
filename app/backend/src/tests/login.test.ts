import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves({ 
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      } as User) // para async
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  })

  const login = {
    email: 'user@user.com',
    password: 'secret_user'
  }

  const loginPassword = {
    password: 'secret_user'
  }

  const loginEmail = {
    email: 'user@user.com',
  }

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY1NzY1MjQ5OH0.UMEAZNmlMqHmvLDTrMz8dfxm1WrFfl07vn_hs2EI0_c'

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