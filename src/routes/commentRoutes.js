const commentRoutes = require ("express").Router();
const commentControllers = require("../controllers/commentControllers")
const authMiddleware = require("../helpers/authMiddleware");

commentRoutes.get("/:id",authMiddleware.checkLogin ,commentControllers.getCommentById);
commentRoutes.post("/",authMiddleware.checkLogin ,commentControllers.postComment);
commentRoutes.get("/event/:id",authMiddleware.checkLogin ,commentControllers.getCommentByEventId);
commentRoutes.get("/user/:id",authMiddleware.checkLogin ,commentControllers.getCommentByUserId);
commentRoutes.delete("/:id",authMiddleware.checkLogin ,commentControllers.deleteComment);
commentRoutes.put("/:id",authMiddleware.checkLogin ,commentControllers.updateComment);

module.exports = commentRoutes;