import mongoose from "mongoose";
import { toJSONPlugin } from "../utils/toJSON.plugin.util.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: [1, "Price must be at least 1"],
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.plugin(toJSONPlugin);

const Product = mongoose.model("Product", productSchema);

export default Product;
