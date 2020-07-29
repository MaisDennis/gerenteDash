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
import MessageMobileController from './app/controllers/MessageMobileController';
import MessageWebPerTaskController from './app/controllers/MessageWebPerTaskController';
import MessageWebController from './app/controllers/MessageWebController';
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

routes.get('/tasks/:id/t_detail', TaskDetailController.index);

export default routes;
