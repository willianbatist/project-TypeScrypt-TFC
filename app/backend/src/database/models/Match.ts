import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  public id!: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'id' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'id' });

export default Match;
