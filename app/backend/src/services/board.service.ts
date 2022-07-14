import { IBoard, IBoardService, IMatchModel, ITeamModel } from '../protocols';
import { handleBoardHome, handleOrderBoard } from '../helpers';
// Realizado com ajuda de Rafael de Jesus Turma 17
export default class BoardService implements IBoardService {
  constructor(private matchModel: IMatchModel, private teamModel: ITeamModel) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  async findAllHome(): Promise<IBoard[] | boolean> {
    const matches = await this.matchModel.findAll(false);
    const teams = await this.teamModel.findAll();
    if (!matches || !teams) {
      return false;
    }
    const board = teams.map((team) => {
      const myMatches = matches.filter((e) => e.homeTeam === team.id);
      return handleBoardHome(team, myMatches);
    });
    const boards = handleOrderBoard(board);
    return boards;
  }
}
