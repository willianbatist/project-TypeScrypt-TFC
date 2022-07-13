import { Router } from 'express';
import { MatchFactory } from '../factory/index';
import validateJWT from '../middleware/validateJWT';
import validationMatch from '../middleware/validateMatches';

const matchRouter = Router();

matchRouter.get('/matches', (req, res, next) => {
  MatchFactory().findAll(req, res, next);
});

matchRouter.post('/matches', validateJWT, validationMatch, (req, res, next) => {
  MatchFactory().create(req, res, next);
});

matchRouter.patch('/matches/:id/finish', validationMatch, (req, res, next) => {
  MatchFactory().update(req, res, next);
});

export default matchRouter;
