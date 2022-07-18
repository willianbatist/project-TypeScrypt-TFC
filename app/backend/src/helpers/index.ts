import { IMatch } from '../protocols';
import { ZERO, ONE, THREE, ONE_HUNDRED, TEN_THOUSAND } from '../constants/index';
// Realizado com ajuda de Rafael de Jesus Turma 17

export const handleGoalsHome = (matches: IMatch[]) => {
  let goalsFavor = ZERO;
  let goalsOwn = ZERO;
  let goalsBalance = ZERO;
  matches.forEach((stats) => {
    goalsFavor += stats.homeTeamGoals;
    goalsOwn += stats.awayTeamGoals;
  });
  goalsBalance = goalsFavor - goalsOwn;
  const totaisGoals = { goalsFavor, goalsOwn, goalsBalance };
  return totaisGoals;
};

export const handleResultHome = (matches: IMatch[]) => {
  let totalVictories = ZERO;
  let totalDraws = ZERO;
  let totalLosses = ZERO;
  matches.forEach((stats) => {
    if (stats.homeTeamGoals - stats.awayTeamGoals > ZERO) totalVictories += ONE;
    else if (stats.homeTeamGoals - stats.awayTeamGoals < ZERO) totalLosses += ONE;
    else totalDraws += ONE;
  });
  const totals = { totalVictories, totalDraws, totalLosses };
  return totals;
};

export const handleTotalsGoals = (victories: number, draws: number, losses: number) => {
  const totalGames = victories + draws + losses;
  const totalPoints = victories * THREE + draws * ONE;
  const efficiency = Math.round((totalPoints * TEN_THOUSAND) / (totalGames * THREE)) / ONE_HUNDRED;
  return { totalGames, totalPoints, efficiency };
};
