const db = require('../config/db');

const UserProductService = {
  // Get all user product links
  getAllUserProductLinks: async () => {
    const result = await db.query('SELECT * FROM user_products');
    return result.rows;
  },

  // Get user product links by user ID
  getUserProductLinkById: async (id) => {
    const result = await db.query('SELECT * FROM user_products WHERE user_id = $1', [id]);
    return result.rows;
  },

  // Update a user product link by ID
  updateUserProductLink: async (id, data) => {
    const {
      product_id,
      association_id,
      product_ids_to_produce,
      area_of_production,
      annual_production,
      annual_turnover,
      years_of_production
    } = data;

    const result = await db.query(
      `UPDATE user_products SET 
        product_id = $1,
        association_id = $2,
        product_ids_to_produce = $3,
        area_of_production = $4,
        annual_production = $5,
        annual_turnover = $6,
        years_of_production = $7
      WHERE id = $8
      RETURNING *`,
      [
        product_id,
        association_id,
        product_ids_to_produce,
        area_of_production,
        annual_production,
        annual_turnover,
        years_of_production,
        id
      ]
    );

    return result.rows[0];
  },

  // Remove a product from product_ids_to_produce for a user
  removeProductFromUser: async (userId, productIdToRemove) => {
    const result = await db.query(
      `UPDATE user_products
       SET product_ids_to_produce = array_remove(product_ids_to_produce, $1)
       WHERE user_id = $2
       RETURNING *`,
      [productIdToRemove, userId]
    );

    return result.rows;
  },

  // ? NEW FUNCTION: Set product_id to NULL for specific user & product
  setProductIdToNullForUser: async (userId, productIdToRemove) => {
    const result = await db.query(
      `UPDATE user_products
       SET product_id = NULL
       WHERE user_id = $1 AND product_id = $2
       RETURNING *`,
      [userId, productIdToRemove]
    );

    return result.rows;
  }
};

module.exports = UserProductService;
