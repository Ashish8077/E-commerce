import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProductsService = async () => {
  return await Product.find({});
};

export const createProductService = async ({
  name,
  price,
  image,
  category,
  subCategory,
}) => {
  let imageUrl = "";

  if (image) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "productsImages",
      });
      imageUrl = cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "";
    } catch (error) {
      throw new Error("Image upload failed");
    }
  }

  return await Product.create({
    name,
    price,
    image: imageUrl,
    category,
    subCategory,
  });
};
