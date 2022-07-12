import { Router } from 'express';
import { MatchFactory } from '../factory/index';

const matchRouter = Router();

matchRouter.get('/matches', (req, res, next) => {
  MatchFactory().findAll(req, res, next);
});

export default matchRouter;
