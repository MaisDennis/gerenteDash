import { Router } from 'express';
import multer from 'multer';
// -----------------------------------------------------------------------------
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import WorkerController from './app/controllers/WorkerController';
import TaskController from './app/controllers/Task_Controller';
import SignatureController from './app/controllers/SignatureController';
import TaskConfirmController from './app/controllers/TaskConfirmController';
import MessageMobileController from './app/controllers/MessageMobileController';
import MessageWebPerTaskController from './app/controllers/MessageWebPerTaskController';
import MessageWebController from './app/controllers/MessageWebController';
import TaskDetailController from './app/controllers/TaskDetailController';
import NotificationController from './app/controllers/NotificationController';
import TaskFinishedByWorkerController from './app/controllers/TaskFinishedByWorkerController';
import TaskUnfinishedByWorkerController from './app/controllers/TaskUnfinishedByWorkerController';
import WorkerMobileController from './app/controllers/WorkerMobileController';

import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import File from './app/models/File';
import Signature from './app/models/Signature';
import profileImgUpload from './app/middlewares/profile';
import signatureImgUpload from './app/middlewares/signature';
// -----------------------------------------------------------------------------
const routes = new Router();
// const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/workers', WorkerController.index);
routes.put('/workers/:id', WorkerController.update);
routes.get('/workers/mobile', WorkerMobileController.index);

routes.get('/tasks', TaskController.index);
routes.get('/tasks/finished', TaskFinishedByWorkerController.index);
routes.get('/tasks/unfinished', TaskUnfinishedByWorkerController.index);
routes.put('/tasks/confirm/:id', TaskConfirmController.update);

routes.get('/messages/web', MessageWebController.index);
routes.get('/messages/web/task', MessageWebPerTaskController.index);
routes.post('/messages/mobile/:id', MessageMobileController.store);
// routes.get('/messages/tfeed', TaskFeedMobileController.index);

// routes.put('/tasks/:id/tfeed/comment', T_FeedController.update);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
routes.get('/signatures', SignatureController.index);

routes.get('/files', FileController.index);

// routes.post(
//   '/signatures',
//   upload.single('signature'),
//   SignatureController.store
// );
routes.post('/signatures', (req, res) => {
  signatureImgUpload(req, res, async error => {
    // console.log(req);
    // console.log('requestOkokok', req.file);
    // console.log('error', error);
    if (error) {
      // console.log('errors', error);
      res.json({ error });
    } else {
      // If File not found
      if (req.file === undefined) {
        // console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      }
      // If Success
      const name = req.file.key;
      const path = req.file.location;
      await Signature.create({
        name,
        path,
      });
      const signature = await Signature.findOne({
        where: {
          name,
        },
      });
      // Save the file name into database into profile model
      res.json({
        image: name,
        location: path,
        signature_id: signature.id,
      });
    }
  });
}); // End of single profile upload

// routes.post('/files', upload.single('file'), FileController.store);
routes.post('/files', (req, res) => {
  profileImgUpload(req, res, error => {
    // console.log(req);
    // console.log('requestOkokok', req.file);
    // console.log('error', error);
    if (error) {
      // console.log('errors', error);
      res.json({ error });
    } else {
      // If File not found
      if (req.file === undefined) {
        // console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      }
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;
      File.create({
        name: imageName,
        path: imageLocation,
      });
      // Save the file name into database into profile model
      res.json({
        image: imageName,
        location: imageLocation,
      });
    }
  });
}); // End of single profile upload

// -----------------------------------------------------------------------------
routes.use(authMiddleware);
// -----------------------------------------------------------------------------

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.post('/workers', WorkerController.store);

routes.post('/tasks', TaskController.store);
routes.put('/tasks/:id', TaskController.update);

routes.get('/tasks/:id/t_detail', TaskDetailController.index);
routes.put('/tasks/:id/t_detail', TaskDetailController.update);

export default routes;
