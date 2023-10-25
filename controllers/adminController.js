const adminData = require("../routes/admin");
const Product = require("../models/currentMonthSales");
exports.getAddProduct = ( req, res, next) => {
    res.render( 'admin/addProduct',
        {
            from: 'addProduct'
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