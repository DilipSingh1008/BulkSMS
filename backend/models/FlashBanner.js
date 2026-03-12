const mongoose = require("mongoose");

const flashBannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    buttonText: { type: String, required: true },
    photo: { type: String }, // store filename/path
    status: { type: Boolean, default: false }, // default false
  },
  { timestamps: true },
);

module.exports = mongoose.model("FlashBanner", flashBannerSchema);
