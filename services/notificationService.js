const db = require('../config/db');

const NotificationService = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM notifications ORDER BY created_at DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM notifications WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ user_id, message }) => {
    const result = await db.query(
      `INSERT INTO notifications (user_id, message)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, message]
    );
    return result.rows[0];
  },

  update: async (id, { user_id, message }) => {
    const result = await db.query(
      `UPDATE notifications SET user_id = $1, message = $2
       WHERE id = $3
       RETURNING *`,
      [user_id, message, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM notifications WHERE id = $1', [id]);
    return { message: 'Notification deleted successfully' };
  }
};

module.exports = NotificationService;
