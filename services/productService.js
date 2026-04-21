const db = require('../config/db');

const ProductService = {
  // Get all products
  getAllProducts: async () => {
    const result = await db.query('SELECT * FROM products ORDER BY product_id');
    return result.rows;
  },

  // Get a single product by ID
  getProductById: async (id) => {
    const result = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
  },

  // Create a new product
  createProduct: async ({ name, association_id, category }) => {
    const result = await db.query(
      'INSERT INTO products (name, association_id, category) VALUES ($1, $2, $3) RETURNING *',
      [name, association_id, category]
    );
    return result.rows[0];
  },

  // Update a product
  updateProduct: async (id, { name, association_id, category }) => {
    const result = await db.query(
      `UPDATE products SET name = $1, association_id = $2, category = $3
       WHERE product_id = $4 RETURNING *`,
      [name, association_id, category, id]
    );
    return result.rows[0];
  },

  // Delete a product
  deleteProduct: async (id) => {
    await db.query('DELETE FROM products WHERE product_id = $1', [id]);
    return { message: 'Product deleted successfully' };
  },

  // ?? Get all distinct categories
  getAllCategories: async () => {
    const result = await db.query('SELECT DISTINCT category FROM products ORDER BY category');
    return result.rows.map(row => row.category);
  },

  // ?? Get all products under a specific category
  getProductsByCategory: async (category) => {
    const result = await db.query(
      'SELECT product_id, name FROM products WHERE category = $1 ORDER BY name',
      [category]
    );
    return result.rows;
  }
};

module.exports = ProductService;
