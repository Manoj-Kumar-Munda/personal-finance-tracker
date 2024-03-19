import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import RegisterPic from "../../assets/signUp.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerValidation } from "../../utils/validationSchema";
import { useRegister } from "./useRegister";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
  })

  const submitHandler = async (data) => {
    setIsLoading(true);
    try{
      await useRegister(data);
      setErr(null);
      setIsLoading(false);
      navigate("/login");
      
    } catch (error) {
      setErr(error?.response?.data.message)
      setIsLoading(false);
    }
  };
  return (
    <div className="lg:w-4/5 my-1 mx-auto bg-white flex items-center gap-x-4">
      <div className="basis-full space-y-4">
        <h1 className="font-Poppins text-3xl font-bold text-slate-700">
          Register.
        </h1>
        <form
          className="max-w-lg w-full space-y-3"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            label="Full name"
            className={`${
              errors.fullName && "ring-1 ring-red-400 focus:ring-red-400"
            }`}
            placeholder="Manoj Kumar"
            {...register("fullName")}
          />
          {errors.fullName && <p>{errors.fullName?.message}</p>}
          <Input
            label="Username"
            className={`${
              errors.username && "ring-1 ring-red-400 focus:ring-red-400"
            }`}
            placeholder="manojkr"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {errors.username?.message}
            </p>
          )}
          <Input
            label="Email"
            className={`${
              errors.email && "ring-1 ring-red-400 focus:ring-red-400"
            }`}
            placeholder="johndoe@example.com"
            {...register("email")}
          />
          <Input
            label="Password"
            className={`${
              errors.password && "ring-1 ring-red-400 focus:ring-red-400"
            }`}
            placeholder="*********"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {errors.password?.message}
            </p>
          )}
          <Input
            label="Upload your avatar"
            type="file"
            name="avatar"
            className={`${
              errors.avatar && "ring-1 ring-red-400 focus:ring-red-400"
            }`}
            accept="image/png,image/jpg,image/jpeg,image/gif"
            {...register("avatar")}
          />
          {errors.avatar && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {errors.avatar?.message}
            </p>
          )}

          {err && (
            <p className="text-sm text-red-400 font-semibold font-Poppins">
              {err}
            </p>
          )}
          <Button
            disabled={isLoading}
            className="w-full rounded-xl py-2 font-Poppins"
          >
            {" "}
            Submit{" "}
          </Button>
        </form>

        <div className="flex gap-2">
          <p className="font-Poppins">Already have an account?</p>
          <span className="font-Poppins">
            <Link
              to={"/login"}
              className="text-sm underline font-bold text-blue-600"
            >
              Login
            </Link>
          </span>
        </div>
      </div>

      <div className="h-full w-full hidden lg:block basis-full">
        <img src={RegisterPic} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
