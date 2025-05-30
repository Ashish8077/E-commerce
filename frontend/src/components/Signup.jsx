import React from "react";
import { Input, Button, FormContainer } from "./index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "../Schema/authSchema";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(signupSchema) });

  const handleSignup = (data) => {
    console.log(data);
    reset();
  };
  return (
    <FormContainer
      title={"Create Your Account"}
      subTitle={"Join us and start shopping your favorite products."}
      prompt={"Already have an account?"}
      promptAction={"Log In"}>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleSignup)}>
        <Input
          label="Full Name"
          placeholder="Joe Doe"
          name="fullName"
          {...register("fullName")}
          error={errors.fullName?.message}
        />

        <Input
          label="Email Address"
          placeholder="you@example.com"
          name="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          placeholder="••••••••"
          name="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button>Signup</Button>
      </form>
    </FormContainer>
  );
};

export default Signup;
