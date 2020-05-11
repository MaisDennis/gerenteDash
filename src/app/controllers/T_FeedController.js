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
    });

    return res.json(tfeed);
  }
}
export default new T_FeedController();
