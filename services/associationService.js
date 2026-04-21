const db = require('../config/db');

const AssociationService = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM associations ORDER BY association_id');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM associations WHERE association_id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ name }) => {
    const result = await db.query(
      'INSERT INTO associations (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  },

  update: async (id, { name }) => {
    const result = await db.query(
      'UPDATE associations SET name = $1 WHERE association_id = $2 RETURNING *',
      [name, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM associations WHERE association_id = $1', [id]);
    return { message: 'Association deleted successfully' };
  }
};

module.exports = AssociationService;
