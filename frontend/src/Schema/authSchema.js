import * as yup from "yup";

const emailRegx =
  /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;

export const signupSchema = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegx, "Please provide valid email address"),
  password: yup
    .string("Password is required")
    .required()
    .min(8, "password must be at least 8 characters"),
});

export const loginSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
