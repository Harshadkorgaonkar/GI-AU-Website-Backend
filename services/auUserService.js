const db = require('../config/db');

// Helper: Validate product ID
const isValidProductId = async (productId) => {
  const result = await db.query(
    'SELECT COUNT(*) FROM products WHERE product_id = $1',
    [productId]
  );
  return parseInt(result.rows[0].count) === 1;
};

// Helper: Fetch association_id for given product_id
const getAssociationIdForProduct = async (productId) => {
  const result = await db.query(
    'SELECT association_id FROM products WHERE product_id = $1',
    [productId]
  );
  return result.rows.length ? result.rows[0].association_id : null;
};

const AuUserService = {
  getAll: async () => {
    const res = await db.query('SELECT * FROM au_users ORDER BY id');
    return res.rows;
  },

  getById: async (id) => {
    const res = await db.query('SELECT * FROM au_users WHERE id = $1', [id]);
    return res.rows[0];
  },

  getAuUsersByProductId: async (productId) => {
    const result = await db.query(
      `SELECT au_users.* 
       FROM au_users
       JOIN user_products ON user_products.user_id = au_users.id 
       WHERE user_products.product_id = $1`,
      [productId]
    );
    return result.rows;
  },

  // NEW: Get AU users by collector_id
  getByCreatorId: async (collectorId) => {
    const res = await db.query('SELECT * FROM au_users WHERE collector_id = $1', [collectorId]);
    return res.rows;
  },

  create: async (data) => {
    const {
      name, address, age, phone, email, gender, area_of_production,
      aadhar, pan, documentary_proof, annual_production,
      annual_turnover, years_of_production, signature_uploaded,
      aadhar_uploaded, pan_uploaded, photo_uploaded,
      product_id, product_ids_to_produce = [], collector_id
    } = data;

    if (!product_id) {
      throw new Error('product_id is required.');
    }

    const validProduct = await isValidProductId(product_id);
    if (!validProduct) throw new Error('Invalid product_id.');

    const associationId = await getAssociationIdForProduct(product_id);

    // Get the current date in YYYY-MM-DD format
    const createdAt = new Date().toISOString().split('T')[0];

    const res = await db.query(
      `INSERT INTO au_users (
        name, address, age, phone, email, gender, area_of_production,
        aadhar, pan, documentary_proof, annual_production, annual_turnover,
        years_of_production, signature_uploaded, aadhar_uploaded,
        pan_uploaded, photo_uploaded, collector_id, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) RETURNING id`,
      [
        name, address, age, phone, email, gender, area_of_production,
        aadhar, pan, documentary_proof, annual_production, annual_turnover,
        years_of_production, signature_uploaded, aadhar_uploaded,
        pan_uploaded, photo_uploaded, collector_id, createdAt, new Date()
      ]
    );

    const userId = res.rows[0].id;

    // Insert into user_products
    await db.query(
      `INSERT INTO user_products (
        user_id, product_id, association_id, area_of_production,
        annual_production, annual_turnover, years_of_production, product_ids_to_produce
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId, product_id, associationId, area_of_production,
        annual_production, annual_turnover, years_of_production, product_ids_to_produce
      ]
    );

    // Fetch the user with the created_at field
    return await AuUserService.getById(userId);
  },

  addProductToExistingUser: async (userId, data) => {
    const {
      product_id, area_of_production, annual_production,
      annual_turnover, years_of_production, product_ids_to_produce = []
    } = data;

    if (!product_id) {
      throw new Error('product_id is required.');
    }

    const validProduct = await isValidProductId(product_id);
    if (!validProduct) throw new Error('Invalid product_id.');

    const associationId = await getAssociationIdForProduct(product_id);

    await db.query(
      `INSERT INTO user_products (
        user_id, product_id, association_id, area_of_production,
        annual_production, annual_turnover, years_of_production, product_ids_to_produce
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId, product_id, associationId, area_of_production,
        annual_production, annual_turnover, years_of_production, product_ids_to_produce
      ]
    );

    return { message: 'Product added successfully.' };
  },

  update: async (id, data) => {
    // Updating AU user info (if needed)
    const {
      name, address, age, phone, email, gender,
      area_of_production, aadhar, pan, documentary_proof,
      annual_production, annual_turnover, years_of_production,
      signature_uploaded, aadhar_uploaded, pan_uploaded, photo_uploaded,
      collector_id // <-- Accept collector_id for update (optional)
    } = data;

    await db.query(
      `UPDATE au_users SET
        name = $1, address = $2, age = $3, phone = $4, email = $5,
        gender = $6, area_of_production = $7, aadhar = $8, pan = $9,
        documentary_proof = $10, annual_production = $11, annual_turnover = $12,
        years_of_production = $13, signature_uploaded = $14, aadhar_uploaded = $15,
        pan_uploaded = $16, photo_uploaded = $17, collector_id = $18, updated_at = NOW()
      WHERE id = $19`,
      [
        name, address, age, phone, email, gender, area_of_production,
        aadhar, pan, documentary_proof, annual_production, annual_turnover,
        years_of_production, signature_uploaded, aadhar_uploaded,
        pan_uploaded, photo_uploaded, collector_id, id // <-- Add collector_id
      ]
    );

    return await AuUserService.getById(id);
  },

  delete: async (id) => {
    await db.query('DELETE FROM user_products WHERE user_id = $1', [id]);
    await db.query('DELETE FROM au_users WHERE id = $1', [id]);
    return { message: 'AU User deleted' };
  }
};

module.exports = AuUserService;
