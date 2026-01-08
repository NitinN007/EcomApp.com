const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { mockPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/mock", protect, mockPayment);

module.exports = router;
