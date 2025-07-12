import Product from "../models/product.model.js";
import { sendResponse } from "../utils/response.util.js";
import {
  createProductService,
  deleteProductService,
  findProducts,
  getAllProductsService,
} from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    return sendResponse(res, 200, { success: true, data: products });
  } catch (error) {
    console.error(`Error in getAllProducts controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    return sendResponse(res, 201, {
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(`Error in createProduct controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, image, isFeatured } = req.body;
  const { id: productId } = req.params;

  const existingProduct = await Product.findById(productId);
  existingProduct;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { name, price, image, isFeatured },
    { new: true }
  );
  await updatedProduct.save();
  return sendResponse(res, 200, { success: true, data: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    await deleteProductService(productId);
    return sendResponse(res, 200, {
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(`Error in deleteProudct controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    // const grouped = {};
    const { categoryName: category } = req.params;


    if (!category)
      return sendResponse(res, 400, {
        success: false,
        error: "Category is required",
      });

    const products = await findProducts(category);

    sendResponse(res, 200, { success: true, data: products });
  } catch (error) {
    console.error(`Error in getProductsByCategory controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};
