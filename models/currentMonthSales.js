const db = require("../util/database");

module.exports = class Product {
    static fetchAll() {
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%Y-%m-%d') AS Date, c.CustomerName, i.ItemName, s.Quantity, (i.ItemPrice * s.Quantity) AS TotalSales " +
            "FROM Sales s JOIN Customer c ON s.CustomerID = c.CustomerID " +
            "JOIN Item i ON s.ItemID = i.ItemID " +
            "WHERE MONTH(s.SalesDate) = MONTH(CURDATE()) AND YEAR(s.SalesDate) = YEAR(CURDATE()) " +
            "ORDER BY TotalSales DESC");
    }

    static getMonthly() {
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%Y-%m') AS Date, SUM(i.ItemPrice * s.Quantity) AS TotalSales " +
            "FROM Sales s JOIN Item i on s.ItemID = i.ItemID " +
            "GROUP BY DATE_FORMAT(s.SalesDate, '%Y-%m') " +
            "ORDER BY Date DESC;");
    }
}