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

cartItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
