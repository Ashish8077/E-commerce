import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price cannot be nagative or zero"),
  image: yup.string().required("Image is required"),
  isFeatured:yup.boolean().required("")
});
