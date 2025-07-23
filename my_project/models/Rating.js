import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Rating", ratingSchema);
