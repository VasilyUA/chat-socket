const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

exports.mongooseDB = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

exports.mongoDB = async () => {
  const DB = "mydb";
  const COLLECTION = "socket.io-adapter-events";

  const mongoClient = new MongoClient("mongodb://127.0.0.1:27017?directConnection=true&replicaSet=rsmongo", {
    useUnifiedTopology: true,
  });

  await mongoClient.connect();

  try {
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6
    });
  } catch (e) {
    // collection already exists
  }

  return mongoClient.db(DB).collection(COLLECTION);
}