import * as yup from "yup";

const imageBase64Regex = /^data:image\/(jpeg|jpg|png|webp|svg\+xml);base64,/;

export const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Price must be number")
    .required("Price is required")
    .min(1, "Price cannot be nagative or zero"),
  image: yup
    .string()
    .matches(imageBase64Regex, "Unsupported base64 image format")
    .required("Image is required")
    .test("isValidBase64", "Invalid base64 encoding", (value) => {
      if (!value) return false;
      const parts = value.split(",");
      if (parts.length !== 2) return false;

      try {
        atob(parts[1]); // decode base64 part
        return true;
      } catch (e) {
        return false;
      }
    }),
  category: yup.string().required("category is required"),
  subCategory: yup.string().required("subCategory is required"),
});
