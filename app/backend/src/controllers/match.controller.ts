import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../protocols/index';
import { TRUE, FALSE } from '../constants/index';

export default class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      let progress = null;
      if (inProgress === FALSE) progress = false;
      if (inProgress === TRUE) progress = true;
      const matches = await this.service.findAll(progress);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.matchUpdate(req.body);
      return res.status(201).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.update(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.service.updateMatch(homeTeamGoals, awayTeamGoals, id);
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  }
}
