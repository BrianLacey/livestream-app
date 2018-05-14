const router = require("express").Router();
const usersController = require("../controllers/users.controllers");
const passport = require("passport");

module.exports = router;

router.post("/users/", usersController.create);
router.get("/users/", usersController.readAll);
router.get("/users/:id", usersController.readById);
router.get(
  "/users/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/cloud-platform"]
  })
);
router.get(
  "/users/auth/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.WBSRVR_URL }),usersController.googleLogin
);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.del);
