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
        id: 123,
        username: 'Willian',
        role: 'user',
        email: 'email@email.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      } as User) // para async
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  })

  const login = {
    email: 'email@email.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }

  it('login successfully', async () => {
    const response = await chai.request(app).post('/login').send(login);
    expect(response.status).to.be.equal(201);
    expect(response.body).have.property('token');
  });
});