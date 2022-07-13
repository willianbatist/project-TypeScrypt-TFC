import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;
    const JWT: string = process.env.JWT_SECRET || 'jwt_secret';
    jwt.verify(token, JWT) as jwt.JwtPayload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
