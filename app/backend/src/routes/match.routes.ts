import { Router } from 'express';
import { MatchFactory } from '../factory/index';
import validateJWT from '../middleware/validateJWT';

const matchRouter = Router();

matchRouter.get('/matches', validateJWT, (req, res, next) => {
  MatchFactory().findAll(req, res, next);
});

matchRouter.post('/matches', validateJWT, (req, res, next) => {
  MatchFactory().create(req, res, next);
});

export default matchRouter;
