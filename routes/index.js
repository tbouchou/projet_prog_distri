const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// Load Product model
const Product = require('../models/Product');
// Load Bid model
const Bid = require('../models/Bid');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req,res) => {
  try {
    const allProducts = await Product.find({});
    const allBids = await Bid.find({});
    res.render('dashboard', { products: allProducts,bids: allBids,user:req.user });
  } catch (err){
    console.log(err);
  }

});

module.exports = router;
