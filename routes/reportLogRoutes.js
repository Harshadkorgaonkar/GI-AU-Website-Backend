const express = require('express');
const router = express.Router();
const ReportLogController = require('../controllers/reportLogController');

router.get('/', ReportLogController.getAll);
router.get('/:id', ReportLogController.getById);
router.post('/', ReportLogController.create);
router.put('/:id', ReportLogController.update);
router.delete('/:id', ReportLogController.delete);

module.exports = router;
