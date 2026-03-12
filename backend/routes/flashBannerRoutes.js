const express = require("express");
const router = express.Router();
const {
  getBanners,
  addBanner,
  updateBanner,
  toggleStatus,
  deleteBanner,
} = require("../controllers/flashBannerController");

const multer = require("multer");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get("/", getBanners);
router.post("/", upload.single("photo"), addBanner);
router.put("/:id", upload.single("photo"), updateBanner);
router.patch("/status/:id", toggleStatus);
router.delete("/:id", deleteBanner);

module.exports = router;
