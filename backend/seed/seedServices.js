import mongoose from "mongoose";
import Service from "../models/Service";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

const servicesData = [
  {
    _id: new mongoose.Types.ObjectId("69ca497b59372941a2dd627f"),
    name: "WhatsApp Campaigns",
    slug: "whatsapp-campaigns",
    category: new mongoose.Types.ObjectId("69ca492f59372941a2dd6264"),
    subCategory: new mongoose.Types.ObjectId("69ca493d59372941a2dd6274"),
    shortDescription:
      "Send automated WhatsApp messages to thousands of customers easily.",
    description:
      "<p>Engage your customers directly on WhatsApp with automated campaigns…",
    galleryImages: ["uploads/default/1774864792060-860162883.jpg"],
    status: true,
    isDeleted: false,
    createdAt: new Date("2026-03-30T09:59:23.082Z"),
    updatedAt: new Date("2026-03-30T09:59:52.083Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("69ca4a2759372941a2dd62f0"),
    name: "High-Speed SMS",
    slug: "high-speed-sms",
    category: new mongoose.Types.ObjectId("69ca49c059372941a2dd62cb"),
    subCategory: new mongoose.Types.ObjectId("69ca49ca59372941a2dd62d4"),
    shortDescription:
      "Send thousands of SMS messages instantly with high delivery rates.",
    description:
      "<p>Our High-Speed SMS service allows businesses to send bulk SMS messa…",
    galleryImages: ["uploads/default/1774866912065-990251547.png"],
    status: true,
    isDeleted: false,
    createdAt: new Date("2026-03-30T10:02:15.454Z"),
    updatedAt: new Date("2026-03-30T10:35:12.076Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("69ca53607f7d82028d732d43"),
    name: "Bulk Voice Call & IVR Solutions",
    slug: "bulk-voice-call--ivr-solutions",
    category: new mongoose.Types.ObjectId("69ca52a57f7d82028d732d21"),
    subCategory: new mongoose.Types.ObjectId("69ca52ca7f7d82028d732d36"),
    shortDescription:
      "Automate your customer outreach with our Bulk IVR system.",
    description:
      '<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"…',
    galleryImages: ["uploads/default/1774867296278-987674100.png"],
    status: true,
    isDeleted: false,
    createdAt: new Date("2026-03-30T10:41:36.292Z"),
    updatedAt: new Date("2026-03-30T10:41:36.292Z"),
  },
];

export default async function seedServices() {
  try {
    await mongoose.connect(MONGO_URI);

    for (const service of servicesData) {
      const exists = await Service.findById(service._id);

      if (exists) {
        console.log(`Service already exists: ${service.name}`);
      } else {
        await Service.create(service);
        console.log(`Created service: ${service.name}`);
      }
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding services:", err);
  }
}
