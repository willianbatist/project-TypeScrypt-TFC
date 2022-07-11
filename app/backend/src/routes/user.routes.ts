import { Router } from 'express';
import { UserFactory } from '../factory';
import { validationEmail } from '../middleware/handleLogin';

const userRouter = Router();

userRouter.post('/login', validationEmail, (req, res, next) => {
  UserFactory().login(req, res, next);
});

export default userRouter;
