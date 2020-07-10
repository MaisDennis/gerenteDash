module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('taskfeeds', 'comment', {
      type: Sequelize.JSON,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('taskfeeds', 'comment');
  },
};
