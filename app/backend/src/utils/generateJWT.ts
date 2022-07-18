import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../protocols/index';
import { SECRET, algorithm } from '../constants/index';

function generateJWT(payload: Omit<IUser, 'password'>) {
  const secret = process.env.JWT_SECRET || SECRET;
  const jwtConfig:object = {
    algorithm,
  };
  return jwt.sign({ payload }, secret, jwtConfig);
}

export default generateJWT;
