const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const email = "admin123@gmail.com";
    const password = "admin@123";
    const name = "Admin";

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Update existing user to admin
      existingUser.role = "admin";
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log(`✅ Existing user updated to admin: ${email}`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`✅ Admin account created successfully!`);
      console.log(`   Email: ${email}`);
      console.log(`   Name: ${name}`);
      console.log(`   Role: admin`);
    }

    console.log("\n🎉 Admin account is ready!");
    console.log("You can now login with:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();

