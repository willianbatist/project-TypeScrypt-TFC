import { NextFunction, Request, Response } from 'express';

export function validationEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function validationPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  } catch (error) {
    next(error);
  }
}
