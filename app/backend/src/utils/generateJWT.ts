import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../protocols/index';

function generateJWT(payload: Omit<IUser, 'password'>) {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const jwtConfig:object = {
    expiresIn: '8h',
    algorithm: 'HS256',
  };
  return jwt.sign({ payload }, secret, jwtConfig);
}

export default generateJWT;
