const ProductService = require('../services/productService');

const ProductController = {
  getAll: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await ProductService.deleteProduct(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ?? New controller: Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await ProductService.getAllCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ?? New controller: Get products by category
  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.query;
      if (!category) {
        return res.status(400).json({ error: 'Category is required' });
      }
      const products = await ProductService.getProductsByCategory(category);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = ProductController;
