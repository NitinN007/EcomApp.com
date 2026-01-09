const rateLimit = require("express-rate-limit");

exports.rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, try again later",
});
