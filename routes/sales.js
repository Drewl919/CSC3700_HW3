const express = require('express');
const router = express.Router();
const path = require('path');
const salesController = require("../controllers/salesController")

router.get( '/home', salesController.showHome );
// router.post( '/product', salesController.getProducts);
// router.get( '/sales', salesController.getSales);
// router.get( '/customer', salesController.getCustomers);
// router.get( '/editItem/:id', adminController.editProduct);
// router.post( '/postUpdateProduct', adminController.postUpdateProduct);

exports.routes = router;