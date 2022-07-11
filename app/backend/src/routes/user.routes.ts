import { Router } from 'express';
import { UserFactory } from '../factory';
import { validationEmail, validationPassword } from '../middleware/handleLogin';

const userRouter = Router();

userRouter.post('/login', validationEmail, validationPassword, (req, res, next) => {
  UserFactory().login(req, res, next);
});

userRouter.get('/login/validate', (req, res, next) => {
  UserFactory().role(req, res, next);
});

export default userRouter;
