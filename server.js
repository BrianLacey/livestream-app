const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { MongoClient, ObjectId } = require("mongodb"),
  assert = require("assert");
const url = process.env.DB_URL;

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

app.post("/", (req, res) => {
  return MongoClient.connect(`${url}/streamlabs-example`, (err, db) => {
    assert.equal(null, err);
    db
      .collection("example")
      .insertOne(req.body)
      .then(result => {
        return res.status(200).send(result);
      })
      .catch(err => res.status(500).send(err));
    db.close();
  });
});

app.get("/", (req, res) => {
  return MongoClient.connect(`${url}/streamlabs-example`, (err, db) => {
    assert.equal(null, err);
    db
      .collection("example")
      .find()
      .toArray()
      .then(result => {
        return res.status(200).send(result);
      })
      .catch(err => res.status(500).send(err));
    db.close();
  });
});

app.get("/:id", (req, res) => {
  return MongoClient.connect(`${url}/streamlabs-example`, (err, db) => {
    assert.equal(null, err);
    db
      .collection("example")
      .findOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        return res.status(200).send(result);
      })
      .catch(err => res.status(500).send(err));
    db.close();
  });
});

app.put("/:id", (req, res) => {
  return MongoClient.connect(`${url}/streamlabs-example`, (err, db) => {
    assert.equal(null, err);
    db
      .collection("example")
      .replaceOne({ _id: ObjectId(req.params.id) }, req.body)
      .then(result => {
        return res.status(200).send(result);
      })
      .catch(err => res.status(500).send(err));
    db.close();
  });
});

app.delete("/:id", (req, res) => {
  return MongoClient.connect(`${url}/streamlabs-example`, (err, db) => {
    assert.equal(null, err);
    db
      .collection("example")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        return res.status(200).send(result);
      })
      .catch(err => res.status(500).send(err));
    db.close();
  });
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);
  console.log("Connected to the database!");
  db.close();
});

app.listen(8080);
