import TaskFeed from '../models/Taskfeed';
import Notification from '../schemas/Notification';
// -----------------------------------------------------------------------------
class TaskFeedMobileController {
  async store(req, res) {
    const { id } = req.params;
    const task_id = id;
    const { worker_id, user_id, feed } = req.body;
    const taskFeed = await TaskFeed.create({
      task_id,
      worker_id,
      user_id,
      feed,
    });

    await Notification.create({
      content: `Mensagem de ${taskFeed.worker_id}.`,
      task: taskFeed.task_id,
      user: taskFeed.user_id,
      worker: taskFeed.worker_id,
      comment: taskFeed.comment,
    });

    return res.json(taskFeed);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { test } = req.query;
    const taskFeeds = await TaskFeed.findAll({
      where: {
        task_id: test,
      },
    });

    return res.json(taskFeeds);
  }
}
export default new TaskFeedMobileController();
