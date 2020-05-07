import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import WorkerController from './app/controllers/WorkerController';
import TaskController from './app/controllers/TaskController';
import DeptController from './app/controllers/DeptController';
import FileController from './app/controllers/FileController';
import T_EndController from './app/controllers/T_EndController';
import T_FeedController from './app/controllers/T_FeedController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.put('/workers/:id', WorkerController.update);
routes.post('/tasks/:id/tfeed', T_FeedController.store);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

// -----------------------------------------------------------------------------
routes.use(authMiddleware);
// -----------------------------------------------------------------------------

routes.put('/users', UserController.update);

routes.post('/workers', WorkerController.store);
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.post('/depts', DeptController.store);
routes.put('/tasks/:id/t_end', T_EndController.update);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
