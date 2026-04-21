const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/templateController');

router.get('/', TemplateController.getAll);
router.get('/:id', TemplateController.getById);
router.post('/', TemplateController.create);
router.put('/:id', TemplateController.update);
router.delete('/:id', TemplateController.delete);

module.exports = router;
