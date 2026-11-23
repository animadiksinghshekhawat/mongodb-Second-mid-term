// =====================================================
// Scenario A1: Online Store Inventory Update
// =====================================================

db = db.getSiblingDB("shopDB");


db.products.drop();

// ---------- Sample data ----------
db.products.insertMany([
  { _id: 1, name: "Wireless Mouse",   category: "Accessories", price: 800,   stock: 50,  discontinued: false, oldCode: "WM-01" },
  { _id: 2, name: "Keyboard",         category: "Accessories", price: 1500,  stock: 30,  discontinued: false, oldCode: "KB-02" },
  { _id: 3, name: "USB Cable",        category: "Accessories", price: 200,   stock: 100, discontinued: false },
  { _id: 4, name: "Laptop",           category: "Computers",   price: 55000, stock: 10,  discontinued: false },
  { _id: 5, name: "Monitor",          category: "Computers",   price: 12000, stock: 15,  discontinued: false },
  { _id: 6, name: "Old Floppy Drive", category: "Computers",   price: 300,   stock: 0,   discontinued: true },
  { _id: 7, name: "Dial-up Modem",    category: "Computers",   price: 500,   stock: 0,   discontinued: true },
  { _id: 8, name: "CD Drive",         category: "Computers",   price: 400,   stock: 0,   discontinued: true }
]);

//  Task 1: Change Keyboard price to 1400 using $set 
print("\n--- Task 1: $set ---");
printjson(db.products.updateOne(
  { name: "Keyboard" },
  { $set: { price: 1400 } }
));

printjson(db.products.findOne({ name: "Keyboard" }));

//  Task 2: Add 25 units to Wireless Mouse stock using $inc
print("\n--- Task 2: $inc ---");
printjson(db.products.updateOne(
  { name: "Wireless Mouse" },
  { $inc: { stock: 25 } }
));

printjson(db.products.findOne({ name: "Wireless Mouse" }));

//Task 3: Remove oldCode from every product using $unset
print("\n--- Task 3: $unset ---");

printjson(db.products.updateMany(
  {},
  { $unset: { oldCode: "" } }
));

// Task 4: Replace the whole document of _id: 3 
print("\n--- Task 4: replaceOne ---");
// replaceOne swaps the entire document (the _id stays the same).
printjson(db.products.replaceOne(
  { _id: 3 },
  { name: "USB-C Cable", category: "Accessories", price: 350, stock: 100, discontinued: false }
));
printjson(db.products.findOne({ _id: 3 }));

//  Task 5: Delete the single product "Old Floppy Drive" 
print("\n--- Task 5: deleteOne ---");
printjson(db.products.deleteOne({ name: "Old Floppy Drive" }));

// Task 6: Delete all remaining discontinued products
print("\n--- Task 6: deleteMany ---");
// Removes Dial-up Modem and CD Drive (deletedCount: 2)
printjson(db.products.deleteMany({ discontinued: true }));
print("Documents left: " + db.products.countDocuments());  

//Task 7: Aggregation 
print("\n--- Task 7: Aggregation ---");
printjson(db.products.aggregate([
  { $match: { price: { $gte: 500 } } },
  { $group: {
      _id: "$category",
      totalStock: { $sum: "$stock" },
      avgPrice:   { $avg: "$price" }
  } },
  { $project: { _id: 0, category: "$_id", totalStock: 1, avgPrice: 1 } },
  { $sort: { totalStock: -1 } }
]).toArray());


