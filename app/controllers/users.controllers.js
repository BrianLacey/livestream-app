const exampleService = require("../services/users.services");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = {
  create: create,
  readAll: readAll,
  readById: readById,
  googleLogin: googleLogin,
  update: update,
  del: del
};

function create(req, res) {
  exampleService
    .create(req.body)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
}

function readAll(req, res) {
  exampleService
    .readAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function readById(req, res) {
  exampleService
    .readById(req.params.id)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
}

function googleLogin(req, res) {
  return res.status(200).send("Google login success!");
}

function update(req, res) {
  exampleService
    .update(req.params.id, req.body)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
}

function del(req, res) {
  exampleService
    .del(req.params.id)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
}
