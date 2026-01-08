const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const makeAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
      console.log("❌ Please provide an email address");
      console.log("Usage: node scripts/makeAdmin.js user@example.com");
      process.exit(1);
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    // Update user role to admin
    user.role = "admin";
    await user.save();

    console.log(`✅ User ${user.name} (${user.email}) is now an admin!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();




