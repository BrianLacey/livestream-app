const router = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb"),
  assert = require("assert");

module.exports = router;

router.post("/", (req, res) => {
  return MongoClient.connect(
    `${process.env.DB_URL}/streamlabs-example`,
    (err, db) => {
      assert.equal(null, err);
      db
        .collection("example")
        .insertOne(req.body)
        .then(result => {
          return res.status(200).send(result);
        })
        .catch(err => res.status(500).send(err));
      db.close();
    }
  );
});

router.get("/", (req, res) => {
  return MongoClient.connect(
    `${process.env.DB_URL}/streamlabs-example`,
    (err, db) => {
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
    }
  );
});

router.get("/:id", (req, res) => {
  return MongoClient.connect(
    `${process.env.DB_URL}/streamlabs-example`,
    (err, db) => {
      assert.equal(null, err);
      db
        .collection("example")
        .findOne({ _id: ObjectId(req.params.id) })
        .then(result => {
          return res.status(200).send(result);
        })
        .catch(err => res.status(500).send(err));
      db.close();
    }
  );
});

router.put("/:id", (req, res) => {
  return MongoClient.connect(
    `${process.env.DB_URL}/streamlabs-example`,
    (err, db) => {
      assert.equal(null, err);
      db
        .collection("example")
        .replaceOne({ _id: ObjectId(req.params.id) }, req.body)
        .then(result => {
          return res.status(200).send(result);
        })
        .catch(err => res.status(500).send(err));
      db.close();
    }
  );
});

router.delete("/:id", (req, res) => {
  return MongoClient.connect(
    `${process.env.DB_URL}/streamlabs-example`,
    (err, db) => {
      assert.equal(null, err);
      db
        .collection("example")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
          return res.status(200).send(result);
        })
        .catch(err => res.status(500).send(err));
      db.close();
    }
  );
});
