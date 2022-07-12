import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../protocols/index';

export default class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      let progress = null;
      if (inProgress === 'false') progress = false;
      if (inProgress === 'true') progress = true;
      const matches = await this.service.findAll(progress);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
