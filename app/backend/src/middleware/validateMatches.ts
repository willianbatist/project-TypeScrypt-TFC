import { NextFunction, Request, Response } from 'express';
import TeamRepository from '../repository/team.repository';
import { TWO } from '../constants/index';

const teams = new TeamRepository();

export default async function validationMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  const checkTeams = await teams.findTeam(homeTeam, awayTeam);
  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  if (checkTeams?.length !== TWO) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}
