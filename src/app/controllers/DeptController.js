// import * as Yup from 'yup';
import Dept from '../models/Dept';

class DeptController {
  async store(req, res) {
    const { name } = req.body;

    const dept = await Dept.create({
      name,
    });
    return res.json(dept);
  }
}
export default new DeptController();
