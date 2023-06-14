const authRoutes = require('express').Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../helpers/authMiddleware');
const bookinControllers = require('../controllers/bookinControllers');
const singleUploadMiddleware = require('../helpers/singleUploadMiddleware');
const cloudinaryMiddleware = require('../helpers/cloudinaryMiddleware');

authRoutes.post('/login', authController.login);
authRoutes.post('/register', singleUploadMiddleware, cloudinaryMiddleware, authController.register);
authRoutes.get("/check", authMiddleware.checkToken);
authRoutes.put("/update",authMiddleware.checkLogin, singleUploadMiddleware, cloudinaryMiddleware, authController.update_profile)

authRoutes.get("/ikut", authMiddleware.checkLogin, bookinControllers.list_event);
authRoutes.post("/ikut", authMiddleware.checkLogin, bookinControllers.ikuti);
authRoutes.delete("/ikut/:id", authMiddleware.checkLogin, bookinControllers.delet_event);

module.exports = authRoutes;