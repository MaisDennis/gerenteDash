import { startOfHour, parseISO, isBefore, subDays } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Task from '../models/Task';
import Worker from '../models/Worker';
import File from '../models/File';
// -----------------------------------------------------------------------------
class Task_Controller {
  async store(req, res) {
    const [
      { worker_id, name, description, start_date, due_date },
      user_id,
    ] = req.body;

    const user = await User.findByPk(user_id);
    const userphonenumber = user.phonenumber;

    const worker = await Worker.findByPk(worker_id);
    const workerphonenumber = worker.phonenumber;

    const hourStart = startOfHour(parseISO(start_date));
    if (isBefore(hourStart, subDays(new Date(), 1))) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const task = await Task.create({
      user_id,
      userphonenumber,
      workerphonenumber,
      worker_id,
      name,
      description,
      // score,

      start_date,
      due_date,
    });

    return res.json(task);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { workerNameFilter, userID } = req.query;
    const tasks = await Task.findAll({
      order: ['due_date'],
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'name', 'dept'],
          where: {
            name: {
              [Op.like]: `%${workerNameFilter}%`,
            },
            user_id: userID,
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
    return res.json(tasks);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params; // id: task_id
    const { worker_id, name, description, start_date, due_date } = req.body;

    let task = await Task.findByPk(id);

    task = await task.update({
      worker_id,
      name,
      description,
      start_date,
      due_date,
    });

    return res.json(task);
  }
}
export default new Task_Controller();
