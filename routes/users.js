const express = require("express");
const router = express.Router();
const UserController = require('../controller/users')

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.delete("/:userId", UserController.deleteOne);

module.exports = router;