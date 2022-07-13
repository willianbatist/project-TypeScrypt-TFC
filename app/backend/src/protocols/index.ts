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

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel {
  findAll(inProgress: boolean | null): Promise<IMatch[] | null>;
  create(match: IMatch):
  Promise<IMatch>;
  update(id: string): Promise<unknown>;
}

export interface IMatchService {
  findAll(inProgress: boolean | null): Promise<IMatch[] | null>;
  matchUpdate(match: IMatch): Promise<IMatch>;
  update(id: string): Promise<unknown>;
}
