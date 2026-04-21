const express = require('express');
const router = express.Router();
const controller = require('../controllers/auUserController');
const upload = require('../middleware/upload');

router.get('/created-by/:userId', controller.getByCreatorId);
router.get('/by-product/:productId', controller.getByProductId);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post(
  '/',
  upload.fields([
    { name: 'signature_uploaded', maxCount: 1 },
    { name: 'aadhar_uploaded', maxCount: 1 },
    { name: 'pan_uploaded', maxCount: 1 },
    { name: 'photo_uploaded', maxCount: 1 },
    { name: 'documentary_proof', maxCount: 1 }
  ]),
  controller.create
);

// Add new product separately to an existing AU user
router.post('/:id/add-product', controller.addProductToExistingUser);

router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;