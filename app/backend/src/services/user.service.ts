import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import generateJWT from '../utils/generateJWT';
import { IUserService, IUserModel } from '../protocols';

export default class User implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(email: string, password: string) {
    const user = await this.model.findUser(email);
    if (!user) return false;
    const check = bcrypt.compareSync(password, user.password);
    if (!check) return false;
    const token = generateJWT(user);
    return token;
  }

  async role(token: string) {
    const JWT: string = process.env.JWT_SECRET || 'jwt_secret';
    const secret = jwt.verify(token, JWT) as jwt.JwtPayload;
    const { password } = secret.payload;
    const role = await this.model.findRole(password);
    return role;
  }
}
