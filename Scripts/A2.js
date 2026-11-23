
// Scenario A2: Student Records - Insert, Query, Sort and Project


db = db.getSiblingDB("collegeDB");


db.students.drop();

// Task 1: Insert Arun using insertOne
print("\n--- Task 1: insertOne ---");
printjson(db.students.insertOne({
  _id: 101,
  name: "Arun",
  dept: "CSE",
  marks: 78,
  scores: [
    { subject: "DBMS",  mark: 85 },
    { subject: "Maths", mark: 70 }
  ]
}));

//  Task 2: Duplicate _id (the deliberate mistake) 
print("\n--- Task 2: duplicate _id ---");
try {
  db.students.insertOne({
    _id: 101,
    name: "Arun Kumar",
    dept: "CSE",
    marks: 70,
    scores: []
  });
} catch (e) {
  print(e.toString());
 
}


//  Task 3: Insert remaining five students with one insertMany
print("\n--- Task 3: insertMany ---");
printjson(db.students.insertMany([
  { _id: 102, name: "Bala",   dept: "IT",  marks: 66, scores: [ { subject: "DBMS", mark: 60 }, { subject: "Maths", mark: 72 } ] },
  { _id: 103, name: "Chitra", dept: "CSE", marks: 91, scores: [ { subject: "DBMS", mark: 95 }, { subject: "Maths", mark: 87 } ] },
  { _id: 104, name: "Divya",  dept: "ECE", marks: 72, scores: [ { subject: "DBMS", mark: 55 }, { subject: "Maths", mark: 89 } ] },
  { _id: 105, name: "Eswar",  dept: "IT",  marks: 84, scores: [ { subject: "DBMS", mark: 88 }, { subject: "Maths", mark: 80 } ] },
  { _id: 106, name: "Farah",  dept: "CSE", marks: 59, scores: [ { subject: "DBMS", mark: 45 }, { subject: "Maths", mark: 73 } ] }
]));

//  Task 4: All CSE students (equality query) 
print("\n--- Task 4: equality ---");
printjson(db.students.find({ dept: "CSE" }).toArray());
// Arun (78), Chitra (91), Farah (59)

// Task 5: Overall marks 75 or more (comparison operator)
print("\n--- Task 5: $gte ---");
printjson(db.students.find({ marks: { $gte: 75 } }).toArray());

//  Task 6: CSE or IT students ($in)
print("\n--- Task 6: $in ---");
printjson(db.students.find({ dept: { $in: ["CSE", "IT"] } }).toArray());


// Task 7: DBMS mark above 80 on the SAME array element 
print("\n--- Task 7: $elemMatch ---");
printjson(db.students.find({
  scores: { $elemMatch: { subject: "DBMS", mark: { $gt: 80 } } }
}).toArray());


// Task 8: Top 3 by marks, only name and marks (hide _id) 
print("\n--- Task 8: sort + limit + projection ---");
printjson(db.students.find({}, { _id: 0, name: 1, marks: 1 })
                     .sort({ marks: -1 })
                     .limit(3)
                     .toArray());
