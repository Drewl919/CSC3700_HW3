const db = require("../util/database");

module.exports = class ItemSales {
    static inset(CustomerID, ItemID, Quantity, SalesDate) {
        return db.execute("INSERT INTO sales (CustomerID, ItemID, Quantity, SalesDate) VALUES (?, ?, ?, ?)",
            [CustomerID, ItemID, Quantity, SalesDate]
        )
    }
    static fetchAll() {
        return db.execute("SELECT i.ItemName ,SUM(i.ItemPrice * s.Quantity) AS TotalSales " +
            "FROM Item i LEFT JOIN Sales s ON i.ItemID = s.ItemID " +
            "GROUP BY i.ItemName " +
            "ORDER BY TotalSales DESC");
    }
}