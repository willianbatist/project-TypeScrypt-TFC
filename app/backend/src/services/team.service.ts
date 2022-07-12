import { ITeamService, ITeamModel, ITeam } from '../protocols/index';

export default class Team implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async findAll(): Promise<ITeam[] | null> {
    const teams = await this.model.findAll();
    return teams;
  }
}
