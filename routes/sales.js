const express = require('express');
const router = express.Router();
const path = require('path');
const salesController = require("../controllers/salesController")

router.get( '/home', salesController.showHome);
router.get( '/customers', salesController.showCustomers);
router.get( '/addCustomer', salesController.getAddCustomer );
router.post( '/customer', salesController.postAddCustomer);
router.get( '/items', salesController.showProducts );
router.get( '/addItem', salesController.getAddItem );
router.post( '/item', salesController.postAddItem);
router.get( '/sales', salesController.showSales );
router.get( '/editCustomer/:id', salesController.editCustomer);
router.post( '/postUpdateCustomer', salesController.postUpdateCustomer);
router.get( '/', salesController.showHome);


exports.routes = router;