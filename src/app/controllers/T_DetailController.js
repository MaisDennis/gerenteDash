// import * as Yup from 'yup';
import Task from '../models/Task';
import Worker from '../models/Worker';
import Notification from '../schemas/Notification';

class T_DetailController {
  async update(req, res) {
    const { id } = req.params; // id: task_id.
    const end_date = new Date();
    const { signature_id } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({});
    // console.log(task.worker_id);

    return res.json(task);
  }

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
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(tasks);
  }
}
export default new T_DetailController();
