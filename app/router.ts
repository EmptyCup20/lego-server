import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/project', controller.project.list);

  router.get('/file', controller.file.list);

  router.get('/user', controller.user.getUserList);
};
