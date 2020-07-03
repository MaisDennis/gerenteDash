import * as Yup from 'yup';
import Worker from '../models/Worker';
import File from '../models/File';
// -----------------------------------------------------------------------------
class WorkerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      dept: Yup.string(),
      cpf: Yup.string()
        .required()
        .min(11),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Create failed' });
    }

    const workerExists = await Worker.findOne({
      where: { name: req.body.name },
    });

    if (workerExists) {
      return res
        .status(400)
        .json({ error: 'Create failed: Worker already exists.' });
    }

    const { name, dept, cpf, user_id } = req.body;
    // const user_id =

    const worker = await Worker.create({
      name,
      dept,
      cpf,
      user_id,
    });
    return res.json(worker);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    const { id } = req.params;

    let worker = await Worker.findByPk(id);

    worker = await worker.update(req.body);

    return res.json(worker);
  }

  // ---------------------------------------------------------------------------
  async index(req, res) {
    const { test } = req.query;
    const workers = await Worker.findAll({
      attributes: ['id', 'name', 'cpf', 'dept', 'avatar_id'],
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
    });
    return res.json(workers);
  }
}

export default new WorkerController();
