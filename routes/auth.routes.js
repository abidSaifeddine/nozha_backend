// routes/auth.js
const express = require("express");
const Controller = require("../controllers/AuthController");
const isAuthenticated = require('../middleware/AuthMiddlware'); // Path to the middleware

const controller = new Controller();
const router = express.Router();

// Authentication routes
router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.get("/check-user", isAuthenticated, controller.checkUser)
module.exports = router;
