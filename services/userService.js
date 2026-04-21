const db = require('../config/db');

const UserService = {
  getAllUsers: async () => {
    const result = await db.query('SELECT * FROM users ORDER BY user_id');
    return result.rows;
  },

  getUserById: async (id) => {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0];
  },

  createUser: async (user) => {
    const {
      username, password, role, is_staff = true, is_admin = false, created_by = null,
      name = null, email = null, address = null, age = null, phone = null,
    } = user;

    const result = await db.query(
      `INSERT INTO users (
         username, password, role, is_staff, is_admin, created_by,
         name, email, address, age, phone, created_at, updated_at
       ) VALUES (
         $1, $2, $3, $4, $5, $6,
         $7, $8, $9, $10, $11, NOW(), NOW()
       ) RETURNING *`,
      [username, password, role, is_staff, is_admin, created_by,
       name, email, address, age, phone]
    );
    return result.rows[0];
  },

  updateUser: async (id, user) => {
    const {
      username, password, role, is_staff, is_admin,
      name = null, email = null, address = null, age = null, phone = null,
    } = user;

    const result = await db.query(
      `UPDATE users SET
         username = $1,
         password = $2,
         role = $3,
         is_staff = $4,
         is_admin = $5,
         name = $6,
         email = $7,
         address = $8,
         age = $9,
         phone = $10,
         updated_at = NOW()
       WHERE user_id = $11 RETURNING *`,
      [username, password, role, is_staff, is_admin,
       name, email, address, age, phone, id]
    );
    return result.rows[0];
  },

  deleteUser: async (id) => {
    await db.query('DELETE FROM users WHERE user_id = $1', [id]);
    return { message: 'User deleted successfully' };
  },
};

module.exports = UserService;
