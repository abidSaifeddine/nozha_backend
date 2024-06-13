module.exports = function (entity, extraRoutes = []) {
  const router = require("express").Router();
  const Controller = require(`../controllers/${entity}Controller`);
  const controller = new Controller();
  router.get(`/`, controller.getAll);
  router.get(`/foreign-data`, controller.foreignData);
  router.get(`/get-by/:key/:value`, controller.getBy);
  router.get(`/get-all-by/:key/:value`, controller.getAllBy);
  router.post(`/`, controller.create); // Ensure proper binding
  router.put(`/`, controller.update);
  router.delete(`/:id`, controller.delete);

  extraRoutes.forEach(er => {
    router[er.method](er.path, controller[er.controllerFunction])
  })
  return router;
};
