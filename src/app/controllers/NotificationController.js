import Notification from '../schemas/Notification';
// -----------------------------------------------------------------------------
class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({})
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  // ---------------------------------------------------------------------------
  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { userread: true },
      { new: true }
    );
    return res.json(notification);
  }
}
export default new NotificationController();
