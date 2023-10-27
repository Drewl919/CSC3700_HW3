const db = require("../util/database");

module.exports = class Product {
    constructor( name, email ) {
        this.name = name;
        this.email = email;
    }
    static insert( CustomerName, CustomerEmail ) {
        return db.execute( "INSERT INTO customer (CustomerName, CustomerEmail) VALUES (?, ?)",
            [CustomerName, CustomerEmail]
        )
    }
    static findById( id ){
        return db.execute( "select * from Customer where id = ?",
            [id] );
    }
    static fetchAll() {
        return db.execute("SELECT c.CustomerID, c.CustomerName, c.CustomerEmail ,SUM(i.ItemPrice * s.Quantity) AS TotalSales " +
            "FROM Customer c " +
            "LEFT JOIN Sales s ON c.CustomerID = s.CustomerID " +
            "LEFT JOIN Item i ON s.ItemID = i.ItemID " +
            "GROUP BY c.CustomerName " +
            "ORDER BY TotalSales DESC ");
    }

    update ( id ){
        return db.execute( "UPDATE Customer SET CustomerName = ?, CustomerEmail = ?,  WHERE CustomerID = ?",
            [this.name, this.email, id ] );
    }
}