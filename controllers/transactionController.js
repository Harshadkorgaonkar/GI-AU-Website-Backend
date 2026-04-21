const TransactionService = require('../services/transactionService');

const TransactionController = {
  getAll: async (req, res) => {
    try {
      const data = await TransactionService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await TransactionService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: 'Transaction not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = await TransactionService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const data = await TransactionService.update(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await TransactionService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = TransactionController;
