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

function convertDate (sale) {
    sale = sale[0].slice(0,5);
    for(let i=0; i<sale.length; i++) {
        switch (sale[i].Date.substring(-2)) {
            case "01":
                sale[i] = `January ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "02":
                sale[i] = `February ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "03":
                sale[i] = `March ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "04":
                sale[i] = `April ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "05":
                sale[i] = `May ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "06":
                sale[i] = `June ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "07":
                sale[i] = `July ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "08":
                sale[i] = `August ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "09":
                sale[i] = `September ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "10":
                sale[i] = `October ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "11":
                sale[i] = `November ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
            case "12":
                sale[i] = `December ${sale[i].Date.substring(0, 5)} - $${sale[i].TotalSales}`;
                break;
        }
    }
    return sale;
}

exports.showCustomers = ( req, res, next) => {
    CustomerSales.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('customers', {
                from: 'customers',
                customers: rows[0]
            })
        })
}

exports.showProducts = ( req, res, next) => {
    ItemSales.fetchAll()
        .then(( rows, fieldData ) => {
            res.render('products', {
                from: 'products',
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


exports.editCustomer = ( req, res, next ) => {
    let id = req.params.id;
    CustomerSales.findById(id)
        .then ((rows, fieldData) =>{
            res.render( 'updateCustomer', {
                title : `Update record:${id} `,
                id : rows[0].id,
                from: 'updateCustomer',
                customer: rows[0][0]
            })
        }).catch( err => {
            console.log( "DB Error=>");
            console.log( err );
        })
}

exports.postUpdateCustomer = ( req, res, next ) => {
    let id = req.body.productId;
    console.log(`id:${id}`);
    let author = req.body.author; //has to be req.body because it is a post request
    let title = req.body.title;
    let price = req.body.price;

    const product = new Product( title, author, price );
    product.update(id)
        .then((row, fieldData) => {
            res.redirect("/showAdmin");
        }).catch(err => {

    })
}