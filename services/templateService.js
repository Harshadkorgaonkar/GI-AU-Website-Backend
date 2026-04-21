// const db = require('../config/db');

// module.exports = {
//   getAll: async () => (await db.query('SELECT * FROM report_templates')).rows,
//   getById: async (id) => (await db.query('SELECT * FROM report_templates WHERE id = $1', [id])).rows[0],
//   create: async ({ name, content }) => (
//     await db.query('INSERT INTO report_templates (name, content, created_at) VALUES ($1, $2, NOW()) RETURNING *', [name, content])
//   ).rows[0],
//   update: async (id, { name, content }) => (
//     await db.query('UPDATE report_templates SET name = $1, content = $2 WHERE id = $3 RETURNING *', [name, content, id])
//   ).rows[0],
//   delete: async (id) => {
//     await db.query('DELETE FROM report_templates WHERE id = $1', [id]);
//     return { message: 'Template deleted' };
//   }
// };



const db = require('../config/db');

const TemplateService = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM report_templates ORDER BY id');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM report_templates WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ name, content }) => {
    const result = await db.query(
      'INSERT INTO report_templates (name, content) VALUES ($1, $2) RETURNING *',
      [name, content]
    );
    return result.rows[0];
  },

  update: async (id, { name, content }) => {
    const result = await db.query(
      'UPDATE report_templates SET name = $1, content = $2 WHERE id = $3 RETURNING *',
      [name, content, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM report_templates WHERE id = $1', [id]);
    return { message: 'Template deleted successfully' };
  }
};

module.exports = TemplateService;
