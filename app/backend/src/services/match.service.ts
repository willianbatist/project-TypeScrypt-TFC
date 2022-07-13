import { IMatch, IMatchModel, IMatchService } from '../protocols/index';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async findAll(inProgress: boolean | null): Promise<IMatch[] | null> {
    const matches = await this.model.findAll(inProgress);
    return matches;
  }

  async matchUpdate(match: IMatch): Promise<IMatch> {
    const matches = await this.model.create(match);
    return matches;
  }

  async update(id: string): Promise<unknown> {
    const match = await this.model.update(id);
    return match;
  }
}
