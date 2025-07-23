import express from "express";
import Rating from "../models/Rating.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { stars, comment } = req.body;
    const rating = new Rating({ stars, comment });
    await rating.save();
    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit rating" });
  }
});

export default router;
