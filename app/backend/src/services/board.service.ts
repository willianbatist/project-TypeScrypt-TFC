import { IBoard, IBoardService, IMatchModel, ITeamModel, ITeam, IMatch } from '../protocols';
import { handleGoalsHome, handleResultHome, handleTotalsGoals } from '../helpers';
import { ZERO, ONE } from '../constants/index';

// Realizado com ajuda de Rafael de Jesus Turma 17
export default class BoardService implements IBoardService {
  constructor(private matchModel: IMatchModel, private teamModel: ITeamModel) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  static handleOrderBoard(board: IBoard[]): IBoard[] {
    const boarder = board.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -ONE;
      if (a.totalPoints < b.totalPoints) return ONE;
      if (a.totalVictories > b.totalVictories) return -ONE;
      if (a.totalVictories < b.totalVictories) return ONE;
      if (a.goalsBalance > b.goalsBalance) return -ONE;
      if (a.goalsBalance < b.goalsBalance) return ONE;
      if (a.goalsFavor > b.goalsFavor) return -ONE;
      if (a.goalsFavor < b.goalsFavor) return ONE;
      if (a.goalsOwn < b.goalsOwn) return -ONE;
      if (a.goalsOwn > b.goalsOwn) return ONE;
      return ZERO;
    });
    return boarder;
  }

  static handleBoardHome(team: ITeam, myMatches: IMatch[]) {
    const { goalsFavor, goalsOwn, goalsBalance } = handleGoalsHome(myMatches);
    const { totalVictories, totalDraws, totalLosses } = handleResultHome(myMatches);
    const { totalGames, totalPoints, efficiency } = handleTotalsGoals(
      totalVictories,
      totalDraws,
      totalLosses,
    );
    const name = team.teamName;
    return { name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  }

  async findAllHome(): Promise<IBoard[] | boolean> {
    const matches = await this.matchModel.findAll(false);
    const teams = await this.teamModel.findAll();
    if (!matches || !teams) {
      return false;
    }
    const board = teams.map((team) => {
      const myTotalMatches = matches.filter((match) => match.homeTeam === team.id);
      return BoardService.handleBoardHome(team, myTotalMatches);
    });
    const boards = BoardService.handleOrderBoard(board);
    return boards;
  }
}
