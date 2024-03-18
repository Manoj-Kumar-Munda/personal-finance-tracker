import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginPic from "../../assets/Login-bro.png";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginValidation } from "../../utils/validationSchema";
import useLogin from "./useLogin";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../utils/slices/authSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await useLogin(data);
      
      setIsLoading(false);
      setError(null);
      dispatch(setCredentials(res?.data.data))
      navigate("/")
    } catch (error) {
      if (error?.response) {
        console.log(error?.response);
        setError(error?.response.data.message);
      } else {
        setError(error?.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="lg:w-4/5 my-1 mx-auto bg-white flex items-center gap-x-4">
      <div className="basis-full space-y-8">
        <h1 className="font-Poppins text-3xl font-bold text-slate-700">
          Login.
        </h1>
        <form
          className="max-w-lg w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Enter username or email"
            placeholder="username or email"
            name="userId"
            {...register("userId")}
            className={` ${
              errors.userId && " focus:ring-red-600 ring-1 ring-red-600"
            }`}
          />

          {errors.userId && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {errors.userId?.message}
            </p>
          )}

          <Input
            label="Enter password"
            placeholder="*********"
            type="password"
            name="password"
            {...register("password")}
            className={`${
              errors.password && "focus:ring-red-600 ring-1 ring-red-600"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {errors.password?.message}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {error}
            </p>
          )}
          <Button disabled={isLoading} className="w-full rounded-xl py-2"> Login </Button>
        </form>

        <div className="flex gap-2">
          <p>Don't have an account?</p>{" "}
          <span>
            <Link
              to={"/register"}
              className="text-sm underline font-bold text-blue-600"
            >
              Register
            </Link>
          </span>
        </div>
      </div>

      <div className="h-full hidden lg:block basis-full">
        <img src={LoginPic} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
