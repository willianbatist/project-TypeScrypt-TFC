import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { teams } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Team Test', () => {
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves(teams as unknown as Team[]) // para async
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('GET /teams successfully', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(teams)
  });
});

describe('2 - Team Test', () => {
  before(() => {
    sinon.stub(Team, 'findOne')
      .resolves(teams[0] as unknown as Team) // para async
  });

  after(() => {
    (Team.findOne as sinon.SinonStub)
      .restore();
  })

  it('GET /teams/:id successfully', async () => {
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(teams[0])
  });
});