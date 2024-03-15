import React from 'react'
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";
import * as yup from "yup";
import RegisterPic from "../../assets/signUp.png";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerValidation } from '../../utils/validationSchema';

const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
  });

  console.log("Errors : ", errors)

  const submitHandler = async (data) => {
    
    console.log( data)

  }
  return (
    <div className="lg:w-4/5 my-1 mx-auto bg-white flex items-center gap-x-4">
      <div className="basis-full space-y-4">
        <h1 className="font-Poppins text-3xl font-bold text-slate-700">
          Register.
        </h1>
        <form className="max-w-lg w-full space-y-3" onSubmit={handleSubmit(submitHandler)}>
          <Input label="Full name" placeholder='Manoj Kumar' {...register("fullName")} />
          <Input label="Username" placeholder='manojkr' {...register("username")} />
          <Input label='Email' placeholder="johndoe@example.com" {...register("email")} />
          <Input label='Password' placeholder="*********" type="password" {...register("password")} />
          <Input 
            label='Upload your avatar' 
            type="file" 
            name="avatar" 
            className="font-Poppins text-sm"   
            accept="image/png,image/jpg,image/jpeg,image/gif" 
            {...register("avatar")}
          />
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