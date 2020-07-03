import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// -----------------------------------------------------------------------------
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import WorkerController from './app/controllers/WorkerController';
import TaskController from './app/controllers/Task_Controller';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';
import TaskConfirmController from './app/controllers/TaskConfirmController';
import TaskFeedMobileController from './app/controllers/TaskFeedMobileController';
import TaskFeedWebController from './app/controllers/TaskFeedWebController';
import TaskDetailController from './app/controllers/TaskDetailController';
import NotificationController from './app/controllers/NotificationController';
import TaskFinishedByWorkerController from './app/controllers/TaskFinishedByWorkerController';
import TaskUnfinishedByWorkerController from './app/controllers/TaskUnfinishedByWorkerController';
import WorkerMobileController from './app/controllers/WorkerMobileController';
import authMiddleware from './app/middlewares/auth';
// -----------------------------------------------------------------------------
const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.put('/workers/:id', WorkerController.update);
routes.post('/tasks/:id/tfeed', TaskFeedMobileController.store);
routes.get('/tasks/tfeed', TaskFeedMobileController.index);
routes.get('/tasks/taskFeedWeb', TaskFeedWebController.index);
// routes.put('/tasks/:id/tfeed/comment', T_FeedController.update);
routes.get('/tasks', TaskController.index);
routes.get('/tasks/finished', TaskFinishedByWorkerController.index);
routes.get('/tasks/unfinished', TaskUnfinishedByWorkerController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
routes.get('/signatures', SignatureController.index);
routes.get('/workers', WorkerController.index);
routes.get('/workers/mobile', WorkerMobileController.index);

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
routes.put('/tasks/:id/t_end', TaskConfirmController.update);
routes.get('/tasks/:id/t_detail', TaskDetailController.index);

export default routes;
