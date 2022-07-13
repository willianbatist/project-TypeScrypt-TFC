import Model from '../database/models/Match';
import { IMatchModel, IMatch } from '../protocols/index';
import teamModel from '../database/models/Team';

export default class MatchRepository implements IMatchModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findAll(inProgress: boolean | null): Promise<IMatch[] | null> {
    let totalMatches: unknown;
    if (inProgress === null) {
      totalMatches = await this.model.findAll({ include: [
        { model: teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    } else {
      totalMatches = await this.model.findAll({ where: { inProgress },
        include: [
          { model: teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] });
    }
    return totalMatches as IMatch[];
  }

  async create(match: IMatch): Promise<IMatch> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const matchCreate = await this.model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return matchCreate;
  }

  async update(id: string): Promise<unknown> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });
    return match;
  }
}
