import React from "react";
import { Button, FormContainer, Input } from "./index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Schema/authSchema";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const handleLogin = (data) => {
    console.log(data);
    reset();
  };

  return (
    <FormContainer
      title={" Welcome Back"}
      subTitle={"Sign in to continue shopping"}
      promt={"Don’t have an account?"}
      promtAction={"Sign Up"}>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleLogin)}>
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
        <Button>Login</Button>
      </form>
    </FormContainer>
  );
};

export default Login;
