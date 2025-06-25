const authController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();
const apiValidator = require('../middlewares/validatorMiddleware');
const {registerSchema, loginSchema} = require("../utils/schemas.util");
const {authenticateToken} = require("../middlewares/auth.middleware");

router.post('/register', apiValidator(registerSchema), authController.register);
router.post('/login', apiValidator(loginSchema), authController.login); // check
router.post('/logout', authController.logout);
router.post('/profile', authenticateToken,authController.getProfile);

module.exports = router;