// import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Task from '../models/Task';
import Worker from '../models/Worker';

class TaskController {
  async store(req, res) {
    const { worker_id, name, description, start_date, due_date } = req.body;

    const hourStart = startOfHour(parseISO(start_date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    const task = await Task.create({
      worker_id,
      name,
      description,
      start_date,
      due_date,
    });
    return res.json(task);
  }

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
export default new TaskController();
