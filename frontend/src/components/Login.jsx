import React from "react";
import { Button, FormContainer, Input } from "./index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Schema/authSchema";
import useUserStore from "../store/authStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const { login, authError, user, loading } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { success } = await login(data);
    if (success) {
      if (user?.role === "admin") return navigate("/secret-dashboard");
      navigate("/");
    }
  };

  return (
    <FormContainer
      title={" Welcome Back"}
      subTitle={"Sign in to continue shopping"}
      promt={"Don’t have an account?"}
      promtAction={"Sign Up"}>
      {authError && (
        <p className="text-red-500 text-center mt-3">{authError}</p>
      )}
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
          type="password"
          placeholder="••••••••"
          name="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button className="flex justify-center">
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              <span>Please Wait...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </FormContainer>
  );
};

export default Login;
