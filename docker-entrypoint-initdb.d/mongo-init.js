print("Start #################################################################");

db = db.getSiblingDB("WPI_DOC");
db.createCollection("users");
db.createCollection("docs");

db.docs.insert({
  _id: ObjectId("6211f43526a6b95248a36cdf"),
  version: "v0.0.1",
  title: "wpi-doc",
  fileName: "wpi-doc.json",
  createdAt: new Date(),
});

print("END #################################################################");
