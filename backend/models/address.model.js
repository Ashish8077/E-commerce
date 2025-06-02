import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", userAddressSchema);

export default Address;
