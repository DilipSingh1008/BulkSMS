const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    period: {
      type: String,
      default: "/month",
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    popular: { type: Boolean, default: false },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Pricing = mongoose.model("Pricing", pricingSchema);
module.exports = Pricing;
