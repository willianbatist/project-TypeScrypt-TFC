import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { boardMock, matchMock, teamMock } from './mocks/index';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Board Test', () => {
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves(matchMock as unknown as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamMock as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('method get /leaderboard/home', async () => {
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(boardMock);
  });
});
