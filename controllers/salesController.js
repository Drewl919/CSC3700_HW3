const MonthSales = require("../models/currentMonthSales");
const CustomerSales = require("../models/customerSales");
const ItemSales = require("../models/itemSales");

exports.showHome = async (req, res, next) => {
    let cust = await CustomerSales.fetchAll();
    let item = await ItemSales.fetchAll();
    let sale = await MonthSales.getMonthly();

    res.render('home', {
        from: 'home',
        customers: cust[0].slice(0, 5),
        products: item[0].slice(0, 5),
        sales: sale[0].slice(0, 5)
    })
}

exports.showCustomers = ( req, res, next) => {
    CustomerSales.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('customers/showCustomers', {
                subLevel: true,
                from: 'customers',
                customers: rows[0]
            })
        })
}

exports.showProducts = ( req, res, next) => {
    ItemSales.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('items/showItems', {
                subLevel: true,
                from: 'items',
                products: rows[0]
            })
        })
}

exports.showSales = ( req, res, next) => {
    MonthSales.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('sales', {
                from: 'sales',
                sales: rows[0]
            })
        })
}
exports.getAddItem = ( req, res, next) => {
    res.render( 'items/addItem',
        {
            subLevel: true,
            from: 'items'
        })
}
exports.postAddItem = ( req, res, next) => {
    let name = req.body.name;
    let price = req.body.price;
    const items = new ItemSales(name, price);
    items.save();
    res.redirect("/items");
}
exports.getAddCustomer = ( req, res, next) => {
    res.render( 'customers/addCustomer',
        {
            subLevel: true,
            from: 'customers'
        })
}
exports.postAddCustomer = ( req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    const customer = new CustomerSales(name, email);
    customer.save();
    res.redirect("/customers");
}

exports.editCustomer = ( req, res, next ) => {
    let id = req.params.id;
    CustomerSales.findById(id)
        .then ((rows, fieldData) =>{
            res.render( 'customers/updateCustomer', {
                from: 'customers',
                subLevel: true,
                title : `Update`,
                id : rows[0].id,
                customer: rows[0][0]
            })
        }).catch( err => {
            console.log( "DB Error=>");
            console.log( err );
        })
}

exports.postUpdateCustomer = ( req, res, next ) => {
    let id = req.body.customerId;
    let name = req.body.name;
    let email = req.body.email;


    const customer = new CustomerSales( name, email );
    customer.update(id)
        .then((row, fieldData) => {
            res.redirect("/customers");
        }).catch(err => {

        })
}