const express = require("express");
const router = express.Router();
const {
  createPricing,
  getPricings,
  getPricingById,
  updatePricing,
  deletePricing,
  togglePricingStatus,
} = require("../controllers/pricingController");

// CRUD
router.post("/", createPricing);
router.get("/", getPricings);
// Status toggle
router.patch("/status/:id", togglePricingStatus);
router.get("/:id", getPricingById);
router.put("/:id", updatePricing);
router.delete("/:id", deletePricing);

module.exports = router;
