const rateLimit = require("express-rate-limit");

exports.apiLimiter =
    process.env.NODE_ENV === "production"
        ? rateLimit({
          windowMs: 15 * 60 * 1000,
          max: 100,
          standardHeaders: true,
          legacyHeaders: false,
          message: "Too many requests, try again later",
        })
        : (req, res, next) => next(); // 🔥 NO LIMIT IN DEV
