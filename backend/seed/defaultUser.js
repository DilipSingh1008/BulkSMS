import mongoose from "mongoose";
import User from "../models/admin";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

const defaultUser = {
  _id: new mongoose.Types.ObjectId("69ca308e85368b8d7408bf02"),
  fullName: "Demo Admin",
  role: "SuperAdmin",
  email: "admin@example.com",
  phone: "9876543210",
  image: "",
  password: "$2a$12$q0Gx2/om5C7VZK.lXRkutuhMO1s17j7MJsE74opZXfecVhjuCdfRq",
  lastLogin: null,
  createdAt: new Date("2026-03-30T00:00:00.000Z"),
  updatedAt: new Date("2026-03-30T00:00:00.000Z"),
};

export default async function seedDefaultUser() {
  try {
    await mongoose.connect(MONGO_URI);
    const existing = await User.findOne({ email: defaultUser.email });

    if (existing) {
      console.log("Default user already exists");
    } else {
      const user = new User(defaultUser);
      await user.save();
      console.log("Default Demo Admin created!");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error creating default user:", err);
  }
}
