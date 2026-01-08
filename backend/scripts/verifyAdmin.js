const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

const verifyAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected\n");

    const email = "www.hypernitin@gmail.com";
    const password = "RealNitin@07";

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      console.log("❌ User not found!");
      process.exit(1);
    }

    console.log("📋 User Details:");
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`\n🔐 Password Verification: ${isMatch ? "✅ Match" : "❌ No Match"}`);

    if (isMatch && user.role === "admin") {
      console.log("\n✅ Admin account is ready and password is correct!");
      console.log("You can login with:");
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
    } else if (!isMatch) {
      console.log("\n❌ Password does not match!");
      console.log("Please check the password or run create-admin script again.");
    } else if (user.role !== "admin") {
      console.log("\n❌ User is not an admin!");
      console.log("Run: npm run make-admin " + email);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

verifyAdmin();




