import express from 'express';
import Order from '../models/order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get logged in user's orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;