// import * as Yup from 'yup';
import { Op } from 'sequelize';
import Task from '../models/Task';
import Worker from '../models/Worker';
import File from '../models/File';

class T_FinishedByWorkerController {
  async index(req, res) {
    const { test } = req.query;
    const tasks = await Task.findAll({
      where: { end_date: { [Op.ne]: null } },
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'name'],
          where: {
            name: {
              [Op.like]: `%${test}%`,
            },
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

export default new T_FinishedByWorkerController();
