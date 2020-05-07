import Sequelize, { Model } from 'sequelize';

class Worker extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        nickname: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Worker;
