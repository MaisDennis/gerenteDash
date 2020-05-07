module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dept_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('workers');
  },
};
