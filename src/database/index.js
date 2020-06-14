import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import Worker from '../app/models/Worker';
import File from '../app/models/File';
import Task from '../app/models/Task';
import Dept from '../app/models/Dept';
import Tfeed from '../app/models/Tfeed';
import Signature from '../app/models/Signature';
import databaseConfig from '../config/database';

const models = [User, Worker, File, Task, Dept, Tfeed, Signature];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gerenteDash',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
