import mongoose from "mongoose";
import { toJSONPlugin } from "../utils/toJSON.plugin.util.js";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.plugin(toJSONPlugin);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
