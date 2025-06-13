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
  });
};

export const findProducts = async (category) => {
  return await Product.find({ category });
};

export const deleteProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  if (product.image) {
    const publicId = product.image.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`productsImages/${publicId}`);
  }
  await Product.findByIdAndDelete(id);
  return product;
};
