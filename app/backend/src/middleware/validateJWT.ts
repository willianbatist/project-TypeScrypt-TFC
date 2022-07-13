import { NextFunction, Request, Response } from 'express';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
