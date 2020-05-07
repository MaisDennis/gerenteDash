// import * as Yup from 'yup';
import Task from '../models/Task';
import Worker from '../models/Worker';
import Notification from '../schemas/Notification';

class T_EndController {
  async update(req, res) {
    const { id } = req.params; // id: task_id.
    const end_date = new Date();
    const { signature_id } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      end_date,
      signature_id,
    });
    // console.log(task.worker_id);

    await Notification.create({
      content: `${task.worker_id} finalizou a tarefa ${task.name}.`,
      user: task.worker_id,
    });

    return res.json(task);
  }

  // Filtered List. Pending
  async index(req, res) {
    const tasks = await Task.findAll({
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
export default new T_EndController();
