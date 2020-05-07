import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING(1234),
        start_date: Sequelize.DATE,
        due_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Worker, { foreignKey: 'worker_id', as: 'worker' });
  }
}
export default Task;
