const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticateToken, authorizedRoles } = require('../middlewares/auth.middleware');

router.get(
  '/',
  authenticateToken,
  categoryController.getCategories
);

router.get(
  '/:categoryId',
  authenticateToken,
  categoryController.getCategoryById
);

router.post(
  '/',
  authenticateToken,
  authorizedRoles(['admin']),
  categoryController.createCategory
);

router.put(
  '/:categoryId',
  authenticateToken,
  authorizedRoles(['admin']),
  categoryController.updateCategory
);

router.delete(
  '/:categoryId',
  authenticateToken,
  authorizedRoles(['admin']),
  categoryController.deleteCategory
);

router.post(
  '/:categoryId/restore',
  authenticateToken,
  authorizedRoles(['admin']),
  categoryController.restoreCategory
);

module.exports = router;