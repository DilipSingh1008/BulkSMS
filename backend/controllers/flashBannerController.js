const FlashBanner = require("../models/FlashBanner");
console.log(FlashBanner);
const fs = require("fs");
const path = require("path");

// Get banners with pagination, search, sort
exports.getBanners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const filter = search ? { title: { $regex: search, $options: "i" } } : {};

    const total = await FlashBanner.countDocuments(filter);
    const banners = await FlashBanner.find(filter)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: banners,
      pagination: { totalPages: Math.ceil(total / limit), currentPage: page },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add banner
exports.addBanner = async (req, res) => {
  try {
    const { title, url, buttonText, status } = req.body;
    const photo = req.file ? req.file.filename : null;

    const banner = new FlashBanner({
      title,
      url,
      buttonText,
      photo,
      status: status === "true" || status === true ? true : false,
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update banner
exports.updateBanner = async (req, res) => {
  try {
    const banner = await FlashBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    const { title, url, buttonText, status } = req.body;

    if (req.file) {
      // remove old photo
      if (banner.photo) {
        fs.unlinkSync(path.join("uploads", banner.photo));
      }
      banner.photo = req.file.filename;
    }

    banner.title = title;
    banner.url = url;
    banner.buttonText = buttonText;
    banner.status = status === "true" || status === true ? true : false;

    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle status
exports.toggleStatus = async (req, res) => {
  try {
    const banner = await FlashBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    banner.status = !banner.status;
    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await FlashBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (banner.photo) {
      fs.unlinkSync(path.join("uploads", banner.photo));
    }

    await banner.deleteOne();
    res.json({ message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
