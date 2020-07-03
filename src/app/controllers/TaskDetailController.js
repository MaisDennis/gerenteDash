// import * as Yup from 'yup';
import Task from '../models/Task';
import Worker from '../models/Worker';
import File from '../models/File';
// -----------------------------------------------------------------------------
class TaskDetailController {
  async update(req, res) {
    const { id } = req.params; // id: task_id.

    let task = await Task.findByPk(id);
    task = await task.update({});

    return res.json(task);
  }

  // ---------------------------------------------------------------------------
  // Filtered List. Pending
  async index(req, res) {
    const { id } = req.params;

    const tasks = await Task.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'name', 'dept'],
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
    return res.json(tasks);
  }
}
export default new TaskDetailController();
