const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const logCollection = db.collection("log");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function updateUser(username, new_vals) {
  userCollection.updateOne({ username: username }, new_vals);
}

function getLogEntry(username, date) {
  return logCollection.findOne({ username: username, date: date });
}

function createLogEntry(username, date) {
  let entry = {
    username: username,
    date: date,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };
  logCollection.insertOne(entry);
}

function updateLogEntry(username, date, new_vals) {
  logCollection.updateOne({ username: username, date: date }, new_vals);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUser,
  getLogEntry,
  createLogEntry,
  updateLogEntry,
};
