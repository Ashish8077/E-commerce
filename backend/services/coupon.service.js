import Coupon from "../models/coupon.model.js";

export const findActiveCouponByUser = async (userId) => {
  return await Coupon.findOne({ userId, isActive: true });
};

export const findCouponByCodeAndUser = async (code, userId) => {
  return await Coupon.findOne({ code, userId, isActive: true });
};
