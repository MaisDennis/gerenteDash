import Sequelize, { Model } from 'sequelize';

class Tfeed extends Model {
  static init(sequelize) {
    super.init(
      {
        feed: Sequelize.STRING(1234),
        comment: Sequelize.JSON,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' });
    this.belongsTo(models.Worker, { foreignKey: 'worker_id', as: 'worker' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
export default Tfeed;
