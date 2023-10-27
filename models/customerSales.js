const db = require("../util/database");

module.exports = class Product {
    static insert( CustomerName, CustomerEmail ) {
        return db.execute( "INSERT INTO customer (CustomerName, CustomerEmail) VALUES (?, ?)",
            [CustomerName, CustomerEmail]
        )
    }
    static fetchAll() {
        return db.execute("SELECT c.CustomerID, c.CustomerName, c.CustomerEmail ,SUM(i.ItemPrice * s.Quantity) AS TotalSales " +
            "FROM Customer c " +
            "LEFT JOIN Sales s ON c.CustomerID = s.CustomerID " +
            "LEFT JOIN Item i ON s.ItemID = i.ItemID " +
            "GROUP BY c.CustomerName " +
            "ORDER BY TotalSales DESC ");
    }
}