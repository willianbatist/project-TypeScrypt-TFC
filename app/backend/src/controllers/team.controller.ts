import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '../protocols/index';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.findAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.findOne(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
