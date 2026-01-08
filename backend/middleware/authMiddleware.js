const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role === "admin") next();
  else res.status(403).json({ message: "Admin access only" });
};
