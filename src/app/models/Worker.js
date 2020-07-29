import Sequelize, { Model } from 'sequelize';

class Worker extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        dept: Sequelize.STRING,
        phonenumber: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Worker;
