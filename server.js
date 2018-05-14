const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { MongoClient, ObjectId } = require("mongodb"),
  assert = require("assert");
const router = require("./app/routes/example.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": process.env.WBSRVR_URL,
    "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  next();
});

app.use("/", router);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

MongoClient.connect(process.env.DB_URL, (err, db) => {
  assert.equal(null, err);
  console.log("Connected to the database!");
  db.close();
});

app.listen(8080);
