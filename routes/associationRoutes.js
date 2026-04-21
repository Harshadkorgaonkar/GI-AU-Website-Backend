const express = require('express');
const router = express.Router();
const AssociationController = require('../controllers/associationController');

router.get('/', AssociationController.getAll);
router.get('/:id', AssociationController.getById);
router.post('/', AssociationController.create);
router.put('/:id', AssociationController.update);
router.delete('/:id', AssociationController.delete);

module.exports = router;