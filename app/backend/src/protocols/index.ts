export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
}

export interface IUserModel {
  findUser(email: string): Promise<IUser | null>;
  findRole(password: string): Promise<IUser | null>;
}

export interface IUserService {
  login(email: string, password: string): Promise<string | boolean>;
  role(authorization: string | undefined): Promise<IUser | null>;
}

export interface ITeam {
  id?: number;
  teamName: string;
}

export interface ITeamModel {
  findAll(): Promise<ITeam[] | null>;
  findOne(id: string): Promise<ITeam | null>;
}

export interface ITeamService {
  findAll(): Promise<ITeam[] | null>;
  findOne(id: string): Promise<ITeam | null>;
}
