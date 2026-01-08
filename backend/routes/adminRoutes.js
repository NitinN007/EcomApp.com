const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/adminController");
const { updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
