import { IMatch, IBoard, ITeam } from '../protocols';
// Realizado com ajuda de Rafael de Jesus Turma 17

function handleGoalsHome(matches: IMatch[]) {
  const totaisGoals = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };
  matches.forEach((e) => {
    totaisGoals.goalsFavor += e.homeTeamGoals;
    totaisGoals.goalsOwn += e.awayTeamGoals;
  });
  totaisGoals.goalsBalance = totaisGoals.goalsFavor - totaisGoals.goalsOwn;
  return totaisGoals;
}

function handleResultHome(matches: IMatch[]) {
  const totals = { totalVictories: 0, totalDraws: 0, totalLosses: 0 };
  matches.forEach((e) => {
    if (e.homeTeamGoals - e.awayTeamGoals > 0) totals.totalVictories += 1;
    else if (e.homeTeamGoals - e.awayTeamGoals < 0) totals.totalLosses += 1;
    else totals.totalDraws += 1;
  });
  return totals;
}

function handleTotalsGoals(victories: number, draws: number, losses: number) {
  const totalGames = victories + draws + losses;
  const totalPoints = victories * 3 + draws * 1;
  const efficiency = Math.round((totalPoints * 10000) / (totalGames * 3)) / 100;
  return { totalGames, totalPoints, efficiency };
}

export function handleOrderBoard(board: IBoard[]) {
  const newBoard = board.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn < b.goalsOwn) return -1;
    if (a.goalsOwn > b.goalsOwn) return 1;
    return 0;
  });
  return newBoard;
}

export function handleBoardHome(team: ITeam, myMatches: IMatch[]) {
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
