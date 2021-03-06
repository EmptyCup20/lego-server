import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/project', controller.project.list);
  router.get('/project/count', controller.project.listCount);
  router.get('/project/findlistByUser', controller.project.findlistByUser);
  router.get('/project/findlistByUser/count', controller.project.findlistCountByUser);
  router.post('/project/add', controller.project.add);
  router.post('/project/update', controller.project.update);
  router.post('/project/remove', controller.project.remove);

  router.post('/git/getContent', controller.github.getContent);
  router.post('/git/fileTree', controller.github.getFileTree);
  router.post('/git/pushFile', controller.github.pushFile);
  router.post('/git/getRepoNodesByPath', controller.github.getRepoNodesByPath);

  router.get('/file', controller.file.list);
  router.get('/file/count', controller.file.listCount);
  router.get('/file/find', controller.file.find);
  router.get('/file/getContent', controller.file.getContent);
  router.post('/file/add', controller.file.add);
  router.post('/file/update', controller.file.update);
  router.post('/file/remove', controller.file.remove);

  router.post('/user', controller.user.user);
  router.put('/user', controller.user.updateUserInfo);
  router.get('/user', controller.user.getUserInfo);
  // router.get('/login', controller.user.login);
};
