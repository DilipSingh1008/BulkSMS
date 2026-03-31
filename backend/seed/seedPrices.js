import mongoose from "mongoose";
import Price from "../models/price";
import Service from "../models/Pricing";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

const pricesData = [
  {
    _id: new mongoose.Types.ObjectId("69ca4b3c59372941a2dd6318"),
    name: "Bulk Messaging WhatsApp",
    price: "8499",
    period: "/month",
    desc: "Designed for growing businesses that need more automation and reach.",
    features: [
      "100,000 WhatsApp SMS per month",
      "Send messages from multiple numbers or accounts.",
      "Target specific groups for better engagement",
      "Connect WhatsApp messaging with CRM, e-commerce, or apps.",
    ],
    serviceName: "WhatsApp Campaigns",
    popular: false,
    status: true,
    isDeleted: false,
    createdAt: new Date("2026-03-30T10:06:52.187Z"),
    updatedAt: new Date("2026-03-30T12:02:29.804Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("69ca4baf59372941a2dd632f"),
    name: "Bulk Messaging SMS",
    price: "8499",
    period: "/month",
    desc: "Complete marketing solution for large businesses.",
    features: [
      "100,000 SMS per month",
      "Customize SMS with customer names or other details.",
      "Customize SMS with customer names or other details.",
      "Customize SMS with customer names or other details.",
    ],
    serviceName: "High-Speed SMS",
    popular: false,
    status: true,
    isDeleted: false,
    createdAt: new Date("2026-03-30T10:08:47.713Z"),
    updatedAt: new Date("2026-03-30T12:02:18.317Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("69ca62597cfb4c498a2e1fd1"),
    name: "Bulk Voice Call & IVR Solutions",
    price: "8499",
    desc: "Perfect for small businesses looking to automate voice campaigns.",
    features: [
      "30-Second Audio Clip Limit",
      "Real-time Delivery Reports",
      "Text-to-Speech (TTS) Integration",
      "Unlimited Concurrent Calls",
    ],
    serviceName: "Bulk Voice Call & IVR Solutions",
    popular: false,
    status: true,
    isDeleted: false,
    createdAt: new Date("2026-03-30T11:45:29.568Z"),
    updatedAt: new Date("2026-03-30T12:01:49.791Z"),
  },
];

export default async function seedPrices() {
  try {
    await mongoose.connect(MONGO_URI);

    for (const item of pricesData) {
      // 🔗 service find karo name se
      const service = await Service.findOne({ name: item.serviceName });

      if (!service) {
        console.log(`❌ Service not found: ${item.serviceName}`);
        continue;
      }

      const exists = await Price.findById(item._id);

      if (exists) {
        console.log(`Price already exists: ${item.name}`);
        continue;
      }

      // service reference add karo
      const newPrice = {
        ...item,
        service: service._id,
      };

      delete newPrice.serviceName; // clean data

      await Price.create(newPrice);

      console.log(`✅ Created price: ${item.name}`);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding prices:", err);
  }
}
