import { NextFunction, Request, Response } from 'express';
import { IBoardService } from '../protocols/index';

export default class BoardService {
  constructor(private service: IBoardService) {
    this.service = service;
  }

  async findHomeAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.findAllHome();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
