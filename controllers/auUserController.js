const AuUserService = require('../services/auUserService');

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await AuUserService.getAll();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  getByCreatorId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const auUsers = await AuUserService.getByCreatorId(userId);
      res.json(auUsers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await AuUserService.getById(req.params.id);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  getByProductId: async (req, res) => {
    try {
      const auUsers = await AuUserService.getAuUsersByProductId(req.params.productId);
      res.json(auUsers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const files = req.files;
      const body = req.body;

      const newItem = await AuUserService.create({
        ...body,
        collector_id: body.collector_id, // <-- Ensure collector_id is passed
        signature_uploaded: files?.signature_uploaded?.[0]?.path || null,
        aadhar_uploaded: files?.aadhar_uploaded?.[0]?.path || null,
        pan_uploaded: files?.pan_uploaded?.[0]?.path || null,
        photo_uploaded: files?.photo_uploaded?.[0]?.path || null,
        documentary_proof: files?.documentary_proof?.[0]?.path || null
      });

      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).json({ error: e.message, stack: e.stack });
    }
  },

  addProductToExistingUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const body = req.body;

      const addedProduct = await AuUserService.addProductToExistingUser(userId, body);
      res.status(201).json(addedProduct);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await AuUserService.update(req.params.id, req.body);
      res.json(updated);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await AuUserService.delete(req.params.id);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};