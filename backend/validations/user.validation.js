import Joi from "joi";

const emailRegx =
  /([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;

const passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const signupSchema = Joi.object({
  fullName: Joi.string()
    .required()
    .messages({ "string.empty": "Fullname is required." }),
  email: Joi.string().required().pattern(emailRegx).messages({
    "string.empty": "Email is required.",
    "string.pattern.base": "Please provide a valid email address.",
  }),
  password: Joi.string().required().min(8).pattern(passwordRegx).messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.base":
      "Password must be include at least one uppercase letter, one lowercase letter, and one number.",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "string.empty": "Email is required" }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});
