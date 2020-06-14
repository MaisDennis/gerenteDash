// import { Op } from 'sequelize';
// import Task from '../models/Task';
// import Worker from '../models/Worker';
// import User from '../models/User';
import Tfeed from '../models/Tfeed';
import Notification from '../schemas/Notification';

class T_FeedController {
  async store(req, res) {
    const { id } = req.params;
    const task_id = id;
    const { worker_id, user_id, feed } = req.body;
    const tfeed = await Tfeed.create({
      task_id,
      worker_id,
      user_id,
      feed,
    });

    await Notification.create({
      content: `Mensagem de ${tfeed.worker_id}.`,
      task: tfeed.task_id,
      user: tfeed.user_id,
      worker: tfeed.worker_id,
      comment: tfeed.comment,
    });

    return res.json(tfeed);
  }

  async index(req, res) {
    const { test } = req.query;
    console.log(test);
    const tfeeds = await Tfeed.findAll({
      where: {
        task_id: test,
      },
    });

    return res.json(tfeeds);
  }

  async update(req, res) {
    const { id } = req.params;
    const newcomment = req.body;

    let tfeed = await Tfeed.findByPk(id);

    // %%%%%%%%%%1
    // let { comment } = tfeed;
    // comment = { comment, newcomment };
    // console.log(comment);

    // %%%%%%%%%%2
    const { comment } = tfeed;

    tfeed = await tfeed.update({
      comment: { newcomment, comment },
    });

    return res.json(tfeed);
  }
}
export default new T_FeedController();
