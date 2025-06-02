import { sendResponse } from "../utils/response.util.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, {
      success: false,
      message: "Validation error",
      error: error.details[0].message,
    });
  }
  next();
};
