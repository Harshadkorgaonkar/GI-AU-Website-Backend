const db = require('../config/db');

const TransactionService = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM transactions ORDER BY id');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ user_id, au_user_id, action }) => {
    const result = await db.query(
      `INSERT INTO transactions (user_id, au_user_id, action) 
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, au_user_id, action]
    );
    return result.rows[0];
  },

  update: async (id, { user_id, au_user_id, action }) => {
    const result = await db.query(
      `UPDATE transactions SET user_id = $1, au_user_id = $2, action = $3 
       WHERE id = $4 RETURNING *`,
      [user_id, au_user_id, action, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM transactions WHERE id = $1', [id]);
    return { message: 'Transaction deleted successfully' };
  }
};

module.exports = TransactionService;
