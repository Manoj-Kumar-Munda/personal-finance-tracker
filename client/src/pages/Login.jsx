import React from "react";
import * as yup from "yup";
import LoginPic from "../assets/Login-bro.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required("Username or email is required")
    .test("isUsernameOrEmail", "Invalid username or email format", (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || value.length >= 3;
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

const Login = () => {
  return (
    <div className="lg:w-4/5 my-1 mx-auto bg-white flex items-center gap-x-4">
      <div className="basis-full space-y-8">
        <h1 className="font-Poppins text-3xl font-bold text-slate-700">
          Login.
        </h1>
        <form className="max-w-lg w-full space-y-4">
          <Input label='Enter username or email' placeholder="username or email" name="userId" />
          <Input label='Enter password' placeholder="*********" type="password" name="password" />
          <Button className="w-full rounded-xl py-2"> Login </Button>
        </form>

        <div className="flex gap-2">
          <p>Don't have an account?</p> <span><Link to={"/register"} className="text-sm underline font-bold text-blue-600">Register</Link></span>
        </div>
      </div>

      <div className="h-full hidden lg:block basis-full">
        <img src={LoginPic} className='w-full h-full object-cover'/>
      </div>
    </div>
  );
};

export default Login;
