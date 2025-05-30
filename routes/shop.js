const express = require('express');
const config = require('../config.json');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

// Shop home
router.get('/', isAuthenticated, (req, res) => {
  res.render('shop/index', {
    user: req.user,
    products: config.shop.products,
    dashboardName: process.env.DASHBOARD_NAME || 'CrazeDash'
  });
});

// Purchase endpoint
router.post('/purchase', isAuthenticated, async (req, res) => {
  try {
    const { product, quantity } = req.body;
    
    if (!config.shop.products[product]) {
      return res.status(400).json({ error: 'Invalid product' });
    }
    
    const productInfo = config.shop.products[product];
    const totalPrice = productInfo.price * quantity;
    
    // Here you would integrate with Stripe or other payment processor
    // For now, we'll just simulate a successful purchase
    
    res.json({ 
      success: true, 
      message: `Successfully purchased ${quantity} ${productInfo.unit} of ${productInfo.name}`,
      total: totalPrice
    });
  } catch (error) {
    res.status(500).json({ error: 'Purchase failed' });
  }
});

module.exports = router;
