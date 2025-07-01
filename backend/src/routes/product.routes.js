const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticateToken, authorizedRoles } = require('../middlewares/auth.middleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { 
  createProductSchema, 
  updateProductSchema,
} = require('../utils/schemas.util');

router.get(
  '/',
  productController.getProducts
);

router.get(
    '/inventory-stats',
    authenticateToken,
    authorizedRoles(['admin', 'collaborator']),
    productController.getProductInventoryStats
);

router.get(
  '/:productId',
  authenticateToken,
    authorizedRoles(['admin', 'collaborator']),
  productController.getProductById
);

router.post(
  '/',
  authenticateToken,
  authorizedRoles(['admin']),
  validatorMiddleware(createProductSchema),
  productController.createProduct
);

router.put(
  '/:productId',
  authenticateToken,
  authorizedRoles(['admin']),
  validatorMiddleware(updateProductSchema),
  productController.updateProduct
);

router.delete(
  '/:productId',
  authenticateToken,
  authorizedRoles(['admin']),
  productController.deleteProduct
);

router.post(
  '/:productId/restore',
  authenticateToken,
  authorizedRoles(['admin']),
  productController.restoreProduct
);

module.exports = router;