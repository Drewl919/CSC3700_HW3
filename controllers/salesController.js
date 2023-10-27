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
exports.postAddProduct = ( req, res, next) => {
    let t = req.body.title;
    let a = req.body.author;
    let p = req.body.price
    const product = new Product( t, a, p );
    product.save();
    // products.push({
    //     title: t,
    //     author: a,
    //     price: p
    // })
    res.redirect('/add-product')
}
exports.getProducts = ( req, res, next ) => {
    Product.fetchAll()
        .then(( rows, fieldData ) => {
            console.log("Rows="); console.log(rows);
            // res.send("It seems ok");
            res.render('admin/showProductsAdmin', {
                title: "Show Products Available (DB)",
                from: 'showProducts',
                products: rows[0]
            })
        })
}
exports.deleteProduct = ( req, res, next ) => {

}
exports.editProduct = ( req, res, next ) => {
    let id = req.params.id;
    console.log( "id=" +id );
    // fetch all the records and find the idth one
    Product.fetchAll( products => {
      //
      for( let i=0; i<products.length; i++){
          if ( i == id ){
              console.log("Product gotten");
              console.log( products[i]);
              res.render( 'admin/ShowUpdateForm', {
                  title : `Update record:${id} `,
                  id : id,
                  from: 'updateProducts',
                  product: products[i]
              })
              return;
          }
      }
        // This is the case where did not find id
        res.render( 'admin/ShowUpdateForm', {
            title : `Update record:${id} `,
            id : id,
            from: 'updateProducts',
            product: null
        })

    })
    // res.send("Happy day is edit again" +id);
}
exports.postUpdateProduct = ( req, res, next ) => {
    let id = req.body.productId;
    console.log(`id:${id}`);
    console.log( `author:${req.body.author}`)
    res.send("Happy day are here again made it to most update product" +id);
}