import React from "react";
import { Button, Input, Select } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../Schema/productSchema";
import imageCompression from "browser-image-compression";
import useProductStore from "../../store/productStore";
import { categoriesData } from "../../data/categoriesData";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(productSchema) });

  const { createProduct, loading } = useProductStore();

  const selectedCategory = watch("category");
  const subCategoryMap = categoriesData[selectedCategory] || [];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024, // Resize to a maximum dimension of 1024px
      });
      const reader = new FileReader();
      reader.onload = () => {
        setValue("image", reader.result);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const handleOnSubmit = async (data) => {
    const { success } = await createProduct(data);
    if (success) {
      reset();
      toast.success("Product uploaded!");
    }
  };

  return (
    <div className="w-full ">
      <form
        className=" space-y-5 w-[500px]  mx-auto bg-white rounded-lg shadow-lg p-8 "
        onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          label="Product Name"
          placeholder="Product Name"
          name="name"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Product Price"
          placeholder="Product Price"
          name="price"
          {...register("price")}
          error={errors.price?.message}
        />

        <Input
          label="Image"
          placeholder="Upload Image"
          type="file"
          name="image"
          onChange={handleImageChange}
          error={errors.image?.message}
        />
        <div className="flex justify-between">
          <div>
            <Select
              options={[
                "Electronics",
                "Fashion",
                "Health & Wellness",
                "Personal Care",
              ]}
              name="category"
              option="Select category"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Select
              options={Object.keys(subCategoryMap)}
              name="subCategory"
              option="Select subCategory"
              {...register("subCategory")}
            />
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.subCategory.message}</p>
            )}
          </div>
        </div>

        <Button className="flex justify-center">
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              <span>Please Wait...</span>
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
