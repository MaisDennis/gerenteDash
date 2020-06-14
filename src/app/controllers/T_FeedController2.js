// import { Op } from 'sequelize';
// import Task from '../models/Task';
import Worker from '../models/Worker';
// import User from '../models/User';
import Tfeed from '../models/Tfeed';
import File from '../models/File';
import Notification from '../schemas/Notification';

class T_FeedController2 {
  async index(req, res) {
    const tfeeds = await Tfeed.findAll({
      include: [
        {
          model: Worker,
          as: 'worker',
          attributes: ['id', 'name'],
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

    return res.json(tfeeds);
  }
}
export default new T_FeedController2();
