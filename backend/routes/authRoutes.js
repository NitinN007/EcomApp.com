const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const { rateLimiter } = require("../middleware/rateLimiter");
router.post("/register",rateLimiter,register);
router.post("/login", rateLimiter,login);

module.exports = router;
