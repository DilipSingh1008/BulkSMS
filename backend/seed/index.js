const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const seedDefaultUser = require("./defaultUser");
const seedServices = require("./seedServices");
const seedPrices = require("./seedPrices");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/BulkSMS";

async function seedAll() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await seedDefaultUser();
    await seedServices();
    await seedPrices();

    console.log("🎉 All seed data inserted successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seed error:", err);
    mongoose.disconnect();
  }
}

seedAll();
