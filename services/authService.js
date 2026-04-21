const db = require('../config/db');

const AuthService = {
  login: async (username, password) => {
    const result = await db.query(
      `SELECT * FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    );
    return result.rows[0]; // if found, return the user
  }
};

module.exports = AuthService;
