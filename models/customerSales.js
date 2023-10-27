const db = require("../util/database");

module.exports = class CustomerSales {
    constructor( n, e ) {
        this.name = n;
        this.email = e;
    }
    save() {
        return db.execute( 'insert into Customer (CustomerName, CustomerEmail) ' +
            'values (?, ?)', [this.name, this.email])
    }
    static findById( id ){
        return db.execute( "SELECT * FROM Customer WHERE CustomerID = ?",
            [id] );
    }
    static fetchAll() {
        return db.execute("SELECT c.CustomerID, c.CustomerName, c.CustomerEmail, CONCAT('$',FORMAT((i.ItemPrice * s.Quantity), 2, 'en_US')) AS TotalSales " +
            "FROM Customer c " +
            "LEFT JOIN Sales s ON c.CustomerID = s.CustomerID " +
            "LEFT JOIN Item i ON s.ItemID = i.ItemID " +
            "GROUP BY c.CustomerName " +
            "ORDER BY (s.Quantity * i.ItemPrice) DESC");
    }

    update ( id ){
        return db.execute( "UPDATE Customer SET CustomerName = ?, CustomerEmail = ?  WHERE CustomerID = ?",
            [this.name, this.email, id]);
    }
}