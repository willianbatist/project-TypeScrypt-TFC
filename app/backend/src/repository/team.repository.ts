import Model from '../database/models/Team';
import { ITeam, ITeamModel } from '../protocols/index';

export default class TeamRepository implements ITeamModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findAll(): Promise<ITeam[] | null> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findOne(id: string): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
