import Worker from '../models/Worker';
import File from '../models/File';
// -----------------------------------------------------------------------------
class WorkerMobileController {
  async index(req, res) {
    const workers = await Worker.findAll({
      attributes: ['id', 'name', 'phonenumber', 'dept', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(workers);
  }
}

export default new WorkerMobileController();
