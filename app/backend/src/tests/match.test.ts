import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = {
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
  },
};

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

describe('2 - Matches create', () => {
  before(() => {
    sinon.stub(Match, 'create')
      .resolves(matchesMock as unknown as Match);
  });

  after(() => {
    (Match.create as sinon.SinonStub)
      .restore();
  })

  it('method post /matches without the token', async () => {
    const response = await chai.request(app).post('/matches').send(matchesMock);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'Token must be a valid token' });
  });
});

describe('3 - Matches create', async () => {
  before(() => {
    sinon.stub(Match, 'update')
      .resolves(); // para async
  });


  after(() => {
    (Match.update as sinon.SinonStub)
      .restore();
  })

  it('metodo patch /matches/:id', async () => {
    const response = await chai.request(app).patch('/matches/1').send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ message: 'ok' }); // eql compare objects
  });
});