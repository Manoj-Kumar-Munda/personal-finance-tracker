import React, { useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordValidation } from "../../utils/validationSchema";
import useChangePassword from "./changePassword";
import SuccessMessage from "../../components/form/SuccessMessage";
import ErrorMessge from "../../components/form/ErrorMessge";

const UpdatePassword = () => {
  const [error, setError] = useState(null);
  const [onSuccess, setOnSucces] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidation),
  });

  const onSubmitHandler = async (data) => {
    try {
      const response = await useChangePassword(data);
      if (response?.status === 200) {
        setOnSucces({ message: "Password changed successfully" });
      }
      setError(null);
    } catch (error) {
      setError(error?.response?.data?.message);
      setOnSucces({});
    }
  };
  return (
    <div>
      <form
        className="space-y-2 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="space-y-1">
          <Input
            type="password"
            className={`w-full font-Poppins text-sm bg-white/70 ${
              errors.currentPassword &&
              " focus:ring-rose-400 ring-2 ring-rose-400"
            }`}
            placeholder="Enter current Password"
            label="Current Password"
            {...register("currentPassword")}
          />

          {errors.currentPassword && (
            <p className="text-sm font-semibold font-Poppins">
              {errors.currentPassword?.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="password"
            className={`w-full font-Poppins text-sm bg-white/70 ${
              errors.newPassword && " focus:ring-rose-400 ring-2 ring-rose-400"
            }`}
            label="New Password"
            placeholder="Enter new password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-sm font-semibold font-Poppins">
              {errors.newPassword?.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Input
            type="password"
            className={`w-full font-Poppins text-sm bg-white/70 ${
              errors.confirmPassword &&
              " focus:ring-rose-400 ring-2 ring-rose-400"
            }`}
            label="Confirm Password"
            placeholder="Re-enter password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm font-semibold font-Poppins">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>

        {error && <ErrorMessge>{error}</ErrorMessge>}
        {onSuccess?.message && (
          <SuccessMessage>{onSuccess.message}</SuccessMessage>
        )}

        <Button>Change Password</Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
