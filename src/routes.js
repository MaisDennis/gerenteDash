import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import WorkerController from './app/controllers/WorkerController';
import TaskController from './app/controllers/TaskController';
import DeptController from './app/controllers/DeptController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';
import T_ConfirmController from './app/controllers/T_ConfirmController';
import T_FeedController from './app/controllers/T_FeedController';
import T_FeedController2 from './app/controllers/T_FeedController2';
import T_DetailController from './app/controllers/T_DetailController';
import NotificationController from './app/controllers/NotificationController';
import T_FinishedByWorkerController from './app/controllers/T_FinishedByWorkerController';
import T_UnfinishedByWorkerController from './app/controllers/T_UnfinishedByWorkerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.put('/workers/:id', WorkerController.update);
routes.post('/tasks/:id/tfeed', T_FeedController.store);
routes.get('/tasks/tfeed', T_FeedController.index);
routes.get('/tasks/tfeed2', T_FeedController2.index);
// routes.put('/tasks/:id/tfeed/comment', T_FeedController.update);
routes.get('/tasks', TaskController.index);
routes.get('/tasks/finished', T_FinishedByWorkerController.index);
routes.get('/tasks/unfinished', T_UnfinishedByWorkerController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
routes.get('/signatures', SignatureController.index);
routes.get('/workers', WorkerController.index);
routes.post(
  '/signatures',
  upload.single('signature'),
  SignatureController.store
);

routes.post('/files', upload.single('file'), FileController.store);

// -----------------------------------------------------------------------------
routes.use(authMiddleware);
// -----------------------------------------------------------------------------

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);

routes.post('/workers', WorkerController.store);

routes.post('/tasks', TaskController.store);

routes.post('/depts', DeptController.store);
routes.put('/tasks/:id/t_end', T_ConfirmController.update);
routes.get('/tasks/:id/t_detail', T_DetailController.index);

// routes.post('/files', upload.single('file'), (req, res) => {
//   return res.json({ ok: true });
// });

export default routes;
