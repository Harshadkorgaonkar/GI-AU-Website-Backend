const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

router.get('/', TransactionController.getAll);
router.get('/:id', TransactionController.getById);
router.post('/', TransactionController.create);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.delete);

module.exports = router;
