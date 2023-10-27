const db = require("../util/database");

module.exports = class ItemSales {
    constructor( n, p ) {
        this.name = n;
        this.price = p;
    }
    save() {
        return db.execute( 'insert into Item (ItemName, ItemPrice) ' +
            'values (?, ?)', [this.name, this.price])
    }
    static findById( id ){
        return db.execute( "SELECT * FROM Item WHERE ItemID = ?",
            [id] );
    }
    static fetchAll() {
        return db.execute("SELECT i.ItemName, CONCAT('$',FORMAT((i.ItemPrice * s.Quantity), 2, 'en_US')) AS TotalSales " +
            "FROM Item i LEFT JOIN Sales s ON i.ItemID = s.ItemID " +
            "GROUP BY i.ItemName " +
            "ORDER BY (s.Quantity * i.ItemPrice) DESC");
    }
}