const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, authorizedRoles } = require('../middlewares/auth.middleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { updateUserSchema, getUsersQuerySchema } = require('../utils/schemas.util');

router.get(
  '/',
  authenticateToken,
  authorizedRoles(['admin']),
  validatorMiddleware(getUsersQuerySchema),
  userController.getUsers
);

router.get(
  '/:userId',
  authenticateToken,
  authorizedRoles(['admin']),
  userController.getUserById
);

router.put(
  '/:userId',
  authenticateToken,
  authorizedRoles(['admin']),
  validatorMiddleware(updateUserSchema),
  userController.updateUser
);

router.patch(
  '/:userId/deactivate',
  authenticateToken,
  authorizedRoles(['admin']),
  userController.deactivateUser
);

router.patch(
  '/:userId/activate',
  authenticateToken,
  authorizedRoles(['admin']),
  userController.activateUser
);

module.exports = router;
