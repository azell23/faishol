const eventRoutes = require ("express").Router();
const eventControllers = require("../controllers/eventControllers")
const authMiddleware = require("../helpers/authMiddleware");
const multiUploadMiddleware = require("../helpers/multiUploadMiddleware")
const cloudinaryMiddleware = require("../helpers/cloudinaryMiddleware")

eventRoutes.get("/",authMiddleware.checkLogin ,eventControllers.getAllEvent);
eventRoutes.post("/",authMiddleware.checkLogin ,multiUploadMiddleware, cloudinaryMiddleware, eventControllers.postEvent);
eventRoutes.get("/search/:key",authMiddleware.checkLogin ,eventControllers.SearchEvent);
eventRoutes.get("/user",authMiddleware.checkLogin ,eventControllers.getEventUser);
eventRoutes.get("/:id",authMiddleware.checkLogin ,eventControllers.getEventById);
eventRoutes.delete("/:id",authMiddleware.checkLogin ,eventControllers.deleteEvent);
eventRoutes.put("/:id",authMiddleware.checkLogin , multiUploadMiddleware, cloudinaryMiddleware, eventControllers.updateEvent);

module.exports = eventRoutes;