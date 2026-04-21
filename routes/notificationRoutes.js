const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

router.get('/', NotificationController.getAll);
router.get('/:id', NotificationController.getById);
router.post('/', NotificationController.create);
router.put('/:id', NotificationController.update);
router.delete('/:id', NotificationController.delete);

module.exports = router;
