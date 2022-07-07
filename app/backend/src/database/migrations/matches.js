module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('matches', {
      id:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
  });
},

down: async (queryInterface) => {
  await queryInterface.dropTable('matches');
},
};