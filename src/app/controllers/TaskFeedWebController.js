import Worker from '../models/Worker';
import TaskFeed from '../models/Taskfeed';
import File from '../models/File';
// -----------------------------------------------------------------------------
class TaskFeedWebController {
  async index(req, res) {
    const { taskID } = req.query;
    const taskFeeds = await TaskFeed.findAll({
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'name'],
          where: {
            user_id: taskID,
          },
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(taskFeeds);
  }
}
export default new TaskFeedWebController();
