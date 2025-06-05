import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(1).messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),

  price: Joi.number().min(1).required().messages({
    "number.base": "Price must be a number.",
    "number.min": "Price must be greater than 0.",
    "any.required": "Price is required.",
  }),

  image: Joi.string().uri().required().messages({
    "string.empty": "Image is required.",
    "string.uri": "Image must be a valid URL.",
  }),
  category: Joi.string()
    .required()
    .min(1)
    .messages({ "string.empty": "category is required." }),
  subCategory: Joi.string()
    .required()
    .min(1)
    .messages({ "string.empty": "subCategory is required." }),
});
