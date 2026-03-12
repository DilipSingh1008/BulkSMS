const Pricing = require("../models/Pricing.js");

// Create Plan
exports.createPricing = async (req, res) => {
  try {
    const { name, price, period, desc, features, status } = req.body;

    if (!name || !price || !desc || !features?.length) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const pricing = new Pricing({
      name,
      price,
      period,
      desc,
      features,
      status: status === "true" || status === true,
    });

    await pricing.save();
    res.status(201).json({ message: "Pricing plan created", data: pricing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all plans (with pagination, search)
exports.getPricings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const query = { isDeleted: false };
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const totalItems = await Pricing.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const plans = await Pricing.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: plans,
      pagination: { totalPages, currentPage: page, totalItems },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single plan by ID
exports.getPricingById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Pricing.findById(id);
    if (!plan || plan.isDeleted) {
      return res.status(404).json({ message: "Pricing plan not found" });
    }
    res.status(200).json({ data: plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update plan
exports.updatePricing = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Pricing.findById(id);
    if (!plan || plan.isDeleted) {
      return res.status(404).json({ message: "Pricing plan not found" });
    }

    const { name, price, period, desc, features, status } = req.body;
    if (!name || !price || !desc || !features?.length) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    plan.name = name;
    plan.price = price;
    plan.period = period || plan.period;
    plan.desc = desc;
    plan.features = features;
    plan.status = status === "true" || status === true;

    await plan.save();
    res.status(200).json({ message: "Pricing plan updated", data: plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Soft Delete
exports.deletePricing = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Pricing.findById(id);
    if (!plan || plan.isDeleted) {
      return res.status(404).json({ message: "Pricing plan not found" });
    }

    plan.isDeleted = true;
    await plan.save();
    res.status(200).json({ message: "Pricing plan deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Toggle Status
exports.togglePricingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Pricing.findById(id);
    if (!plan || plan.isDeleted) {
      return res.status(404).json({ message: "Pricing plan not found" });
    }

    plan.status = !plan.status;
    await plan.save();
    res
      .status(200)
      .json({ message: "Pricing plan status updated", status: plan.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
