import React from "react";
import { Button, FormContainer, Input, Select } from "../../components";

const CreateProductPage = () => {
  return (
    <div className="w-full  p-8 ">
      <form className="mt-8 space-y-5 w-[500px]  mx-auto bg-white rounded-lg shadow-lg p-8  ">
        <Input label="Product Name" placeholder="Product Name" name="name" />

        <Input label="Product Price" placeholder="Product Price" name="price" />

        <Input
          label="Image"
          placeholder="Upload Image"
          type="file"
          name="image"
        />
        <div className="flex">
          <Select
            label={"Category"}
            options={[
              "Electronics",
              "Fashion",
              "Health and wellness",
              "Personal Care",
            ]}
            name="Category"
          />
          <Select
            label={"SubCategory"}
            options={[
              "Smartphones ",
              "Laptops & Tablets",
              "Smart Home Devices",
              "Audio Devices",
            ]}
            name="subCategory"
          />
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" className="cursor-pointer" />
          <label htmlFor="">Featured this product</label>
        </div>
        <Button>Add Product</Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
