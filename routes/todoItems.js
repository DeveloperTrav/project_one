const router = require("express").Router();

const todoItemsController = require("../controllers/todoItemsController");

router.get("/new", todoItemsController.new);
router.get("/", todoItemsController.index);
router.get("/:id", todoItemsController.show);
router.post("/", todoItemsController.create);
router.get("/:id/edit", todoItemsController.edit);
router.post("/update", todoItemsController.update);
router.post("/destroy", todoItemsController.destroy);

module.exports = router;

