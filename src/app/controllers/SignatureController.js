import Signature from '../models/Signature';

class SignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    console.log(path);
    const signature = await Signature.create({
      name,
      path,
    });
    return res.json(signature);
  }

  async index(req, res) {
    const signatures = await Signature.findAll({});
    console.log(signatures);
    return res.json(signatures);
  }
}
export default new SignatureController();
