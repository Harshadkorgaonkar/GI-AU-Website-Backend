const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Existing routes
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

// ?? New routes for category and products by category
router.get('/categories/all', ProductController.getAllCategories);
router.get('/categories/products', ProductController.getProductsByCategory);

module.exports = router;
