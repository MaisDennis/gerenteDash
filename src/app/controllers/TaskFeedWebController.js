import Worker from '../models/Worker';
import TaskFeed from '../models/TaskFeed';
import File from '../models/File';
// -----------------------------------------------------------------------------
class TaskFeedWebController {
  async index(req, res) {
    const { test } = req.query;
    const taskFeeds = await TaskFeed.findAll({
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'name'],
          where: {
            user_id: test,
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
