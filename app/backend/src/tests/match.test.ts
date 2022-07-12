import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('1- Matches successfully', () => {
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves([{ 
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: "São Paulo"
        },
        teamAway: {
          teamName: "Grêmio"
        }
      }] as unknown as Match[]) // para async
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
  })

  it('GET /matches successfully', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([{ 
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    }])
  });

});