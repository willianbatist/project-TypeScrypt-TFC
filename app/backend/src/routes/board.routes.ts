import { Router } from 'express';
import { BoardFactory } from '../factory/index';

const boardRouter = Router();

boardRouter.get('/leaderboard/home', (req, res, next) => {
  BoardFactory().findHomeAll(req, res, next);
});

export default boardRouter;
