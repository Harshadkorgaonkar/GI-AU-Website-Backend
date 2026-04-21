const db = require('../config/db');

const ReportLogService = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM report_logs ORDER BY id');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM report_logs WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ user_id, template_id }) => {
    const result = await db.query(
      `INSERT INTO report_logs (user_id, template_id) 
       VALUES ($1, $2) RETURNING *`,
      [user_id, template_id]
    );
    return result.rows[0];
  },

  update: async (id, { user_id, template_id }) => {
    const result = await db.query(
      `UPDATE report_logs SET user_id = $1, template_id = $2 
       WHERE id = $3 RETURNING *`,
      [user_id, template_id, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM report_logs WHERE id = $1', [id]);
    return { message: 'Report log deleted successfully' };
  }
};

module.exports = ReportLogService;
