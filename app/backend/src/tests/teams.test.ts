import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Team Test', () => {
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves([{
          id: 1,
          team_name: 'Avaí/Kindermann',
        }] as unknown as Team[]) // para async
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('GET /teams successfully', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([{ id: 1, team_name: 'Avaí/Kindermann' }])
  });
});

describe('2 - Team Test', () => {
  before(() => {
    sinon.stub(Team, 'findOne')
      .resolves({
        id: 5,
        team_name: 'Cruzeiro',
      } as unknown as Team) // para async
  });

  after(() => {
    (Team.findOne as sinon.SinonStub)
      .restore();
  })

  it('GET /teams/:id successfully', async () => {
    const response = await chai.request(app).get('/teams/:id');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([{ id: 5, team_name: 'Cruzeiro' }])
  });
});