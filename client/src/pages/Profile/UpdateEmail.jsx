import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailValidation } from "../../utils/validationSchema";
import useChangeEmail from "./useChangeEmail";

const UpdateEmail = ({ userInfo }) => {
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailValidation),
  });

  const onSubmitHandler = async (data) => {
    try {
      const response = await useChangeEmail(data);

      console.log("response: ", response);
      if(response?.status === 200){
        setIsSuccess({message: response?.data?.message})
      }

      setError(null);
    } catch (error) {
      setError(error?.response?.data?.message);
      setIsSuccess({});
    }
  };
  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex gap-2">
          <Input
            className={`w-full bg-white/70 ${
              errors.newEmail && "focus:ring-2 focus:ring-rose-400 ring-2 ring-rose-400"
            }`}
            defaultValue={userInfo?.email}
            {...register("newEmail")}
          />
          <Button>Change</Button>
        </div>
        {errors.newEmail && <p>{errors.newEmail.message}</p>}
        {error && <p>{error}</p>}
        {isSuccess?.message && <p>{isSuccess.message}</p>}
      </form>
    </div>
  );
};

export default UpdateEmail;
