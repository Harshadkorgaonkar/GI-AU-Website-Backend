const express = require('express');
const router = express.Router();
const UserProductService = require('../services/userProductService');

// ? Remove a product from product_ids_to_produce array (must come first!)
router.put('/remove_product', async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ error: 'user_id and product_id are required' });
  }

  try {
    const updated = await UserProductService.removeProductFromUser(user_id, product_id);
    res.json({ message: 'Product removed successfully', data: updated });
  } catch (error) {
    console.error('Remove error:', error);
    res.status(500).json({ error: 'Failed to remove product from user' });
  }
});

// ? NEW ROUTE: Set product_id to NULL for a user-product row
router.put('/set_product_null', async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ error: 'user_id and product_id are required' });
  }

  try {
    const updated = await UserProductService.setProductIdToNullForUser(user_id, product_id);
    res.json({ message: 'product_id set to NULL successfully', data: updated });
  } catch (error) {
    console.error('Set NULL error:', error);
    res.status(500).json({ error: 'Failed to set product_id to NULL' });
  }
});

// ? Get all user-product links
router.get('/', async (req, res) => {
  try {
    const links = await UserProductService.getAllUserProductLinks();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user-product links' });
  }
});

// ? Get user-product link by user ID
router.get('/:id', async (req, res) => {
  try {
    const link = await UserProductService.getUserProductLinkById(req.params.id);
    if (!link) {
      return res.status(404).json({ error: 'User-product link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user-product link' });
  }
});

// ? Update user-product row by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await UserProductService.updateUserProductLink(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'User-product link not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update user-product link' });
  }
});

module.exports = router;
