import { startOfHour, parseISO, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Task from '../models/Task';
import Worker from '../models/Worker';
import File from '../models/File';
// -----------------------------------------------------------------------------
class Task_Controller {
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

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { workerNameFilter, userID } = req.query;
    const tasks = await Task.findAll({
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
}
export default new Task_Controller();
