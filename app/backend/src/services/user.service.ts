import * as bcrypt from 'bcryptjs';
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
}
