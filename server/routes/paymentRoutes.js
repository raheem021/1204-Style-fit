import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  console.log('Payment intent request, amount:', amount);
  console.log('Stripe key available:', !!process.env.STRIPE_SECRET_KEY);
  
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    });
    console.log('Payment intent created:', paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;