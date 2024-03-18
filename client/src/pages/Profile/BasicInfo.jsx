import React from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";

const BasicInfo = ({ userInfo }) => {
  return (
    <div className="space-y-2">
      <div className="flex">
        <h1 className="font-Poppins font-semibold px-6 basis-40">Name</h1>
        <p className="font-Poppins font-light">{userInfo?.fullName}</p>
      </div>

      <div className="flex">
        <h1 className="font-Poppins font-semibold px-6 basis-40">Username</h1>
        <p className="font-Poppins font-light">{userInfo?.username}</p>
      </div>

      <div className="flex">
        <h1 className="font-Poppins font-semibold px-6 basis-40">Email</h1>
        <p className="font-Poppins font-light">{userInfo?.email}</p>
      </div>

    </div>
  );
};

export default BasicInfo;
