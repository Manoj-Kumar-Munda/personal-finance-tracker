import React from 'react'
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import * as yup from "yup";
import RegisterPic from "../assets/signUp.png";

const Register = () => {
  return (
    <div className="lg:w-4/5 my-1 mx-auto bg-white flex items-center gap-x-4">
      <div className="basis-full space-y-8">
        <h1 className="font-Poppins text-3xl font-bold text-slate-700">
          Register.
        </h1>
        <form className="max-w-lg w-full space-y-4">
          <Input label="Enter your name" placeholder='Manoj Kumar'/>
          <Input label='Enter username or email' placeholder="username or email" name="userId" />
          <Input label='Enter password' placeholder="*********" type="password" name="password" />
          <Input label='Upload your avatar' type="file" name="avatar" className="font-Poppins text-sm" />
          <Button className="w-full rounded-xl py-2 font-Poppins "> Submit </Button>
        </form>

        <div className="flex gap-2">
          <p className='font-Poppins'>Already have an account?</p> 
          <span className='font-Poppins'><Link to={"/login"} className="text-sm underline font-bold text-blue-600">Login</Link></span>
        </div>
      </div>

      <div className="h-full w-full hidden lg:block basis-full">
        <img src={RegisterPic} className='w-full h-full object-cover'/>
      </div>
    </div>
  );
}

export default Register