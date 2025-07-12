
import {
  findActiveCouponByUser,
  findCouponByCodeAndUser,
} from "../services/coupon.service.js";
import { sendResponse } from "../utils/response.util.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await findActiveCouponByUser(req.user._id);
    return sendResponse(res, 200, { success: true, data: coupon });
  } catch (error) {
    console.error(`Error in getCoupon controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await findCouponByCodeAndUser(code, req.user._id);

    if (!coupon) {
      return sendResponse(res, 404, {
        success: false,
        message: "Coupon not found",
      });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return sendResponse(res, 404, {
        success: false,
        message: "Coupon expired",
      });
    }
    return sendResponse(res, 200, {
      message: "Coupon is valid",
      data: {
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      },
    });
  } catch (error) {
    console.error(`Error in validateCoupon controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};
