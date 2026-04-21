const NotificationService = require('../services/notificationService');

const NotificationController = {
  getAll: async (req, res) => {
    try {
      const notifications = await NotificationService.getAll();
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const notification = await NotificationService.getById(req.params.id);
      if (!notification) return res.status(404).json({ message: 'Notification not found' });
      res.json(notification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const newNotification = await NotificationService.create(req.body);
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await NotificationService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await NotificationService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = NotificationController;
