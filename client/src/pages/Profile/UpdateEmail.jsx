import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailValidation } from "../../utils/validationSchema";
import useChangeEmail from "./useChangeEmail";
import SuccessMessage from "../../components/form/SuccessMessage";
import ErrorMessge from "../../components/form/ErrorMessge";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../../utils/slices/authSlice";

const UpdateEmail = () => {
  console.log("Update Email called");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);
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
      if (response?.status === 200) {
        console.log(" Response: ", response.data);
        setIsSuccess({ message: response?.data?.message });
        dispatch(setCredentials(response?.data?.data));
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
              errors.newEmail &&
              "focus:ring-2 focus:ring-rose-400 ring-2 ring-rose-400"
            }`}
            defaultValue={userInfo?.email}
            {...register("newEmail")}
          />
          <Button>Change</Button>
        </div>
        {errors.newEmail && (
          <ErrorMessge>{errors.newEmail.message}</ErrorMessge>
        )}
        {error && <p>{error}</p>}
        {isSuccess?.message && (
          <SuccessMessage>{isSuccess.message}</SuccessMessage>
        )}
      </form>
    </div>
  );
};

export default UpdateEmail;
