import React from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";

const BasicInfo = ({userInfo}) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input className="w-full bg-white/70" defaultValue={userInfo?.fullName} />
        <Button>Change</Button>
      </div>

      <div className="flex gap-2">
        <Input className="w-full bg-white/70" defaultValue={userInfo?.email} />
        <Button>Change</Button>
      </div>

      <div className="flex gap-2">
        <Input className="w-full bg-white/70" defaultValue={userInfo?.username} />
        <Button>Change</Button>
      </div>
    </div>
  );
};

export default BasicInfo;
