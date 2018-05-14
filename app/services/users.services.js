const { MongoClient, ObjectId } = require("mongodb"),
  assert = require("assert");

module.exports = {
  create: create,
  readAll: readAll,
  readById: readById,
  update: update,
  del: del
};

function create(body) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      `${process.env.DB_URL}/streamlabs-example`,
      (err, db) => {
        assert.equal(null, err);
        db
          .collection("users")
          .insertOne(body)
          .then(result => resolve(result))
          .catch(err => reject(err));
        db.close();
      }
    );
  });
}

function readAll() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      `${process.env.DB_URL}/streamlabs-example`,
      (err, db) => {
        assert.equal(null, err);
        db
          .collection("users")
          .find()
          .toArray()
          .then(result => resolve(result))
          .catch(err => reject(err));
        db.close();
      }
    );
  });
}

function readById(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      `${process.env.DB_URL}/streamlabs-example`,
      (err, db) => {
        assert.equal(null, err);
        db
          .collection("users")
          .findOne({ "_id": ObjectId(id) })
          .then(result => resolve(result))
          .catch(err => reject(err));
        db.close();
      }
    );
  });
}

function update(id, body) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      `${process.env.DB_URL}/streamlabs-example`,
      (err, db) => {
        assert.equal(null, err);
        db
          .collection("users")
          .replaceOne({ "_id": ObjectId(id) }, body)
          .then(result => resolve(result))
          .catch(err => reject(err));
        db.close();
      }
    );
  });
}

function del(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      `${process.env.DB_URL}/streamlabs-example`,
      (err, db) => {
        assert.equal(null, err);
        db
          .collection("users")
          .deleteOne({ "_id": ObjectId(id) })
          .then(result => resolve(result))
          .catch(err => reject(err));
        db.close();
      }
    );
  });
}
