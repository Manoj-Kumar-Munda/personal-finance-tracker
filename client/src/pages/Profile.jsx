import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../components/form/Input";
import Button from "../components/form/Button";

const Profile = () => {
  const { userInfo } = useSelector((store) => store.auth);

  const [activeTab, setActiveTab] = useState("tab-1");
  console.log("User info: ", userInfo);

  return (
    <div className=" relative bg-gradient-to-br from-[#abdcff] to-[#0396ff]">
      <div className="max-w-screen-lg mx-auto my-4 space-y-6 px-2">
        <h1 className="text-3xl font-bold font-Poppins text-slate-700">
          Profile
        </h1>
        <div className=" flex gap-4 flex-wrap bg-white/30 backdrop-blur-xl p-3 rounded-2xl divide-x-0 md:divide-x md:divide-slate-400">
          <div className="flex flex-col items-center basis-full md:basis-3/12 min-w-fit">
            <img src={userInfo?.avatar} className="w-32 h-32 rounded-full" />
            <span className="font-Poppins font-semibold text-slate-700">
              {userInfo?.fullName}
            </span>
          </div>

          <div className="md:pl-3 space-y-4 grow">
            <h2 className="text-xl font-bold font-Poppins text-slate-700 ">
              Update Profile
            </h2>

            <div className="flex bg-white/40 backdrop-blur-lg rounded-md overflow-hidden ">
              <button
                className={`px-4 py-2 ${
                  activeTab === "tab-1" && "border-b-2 border-blue-600"
                }`}
                onClick={() => setActiveTab("tab-1")}
              >
                <span className="font-Poppins text-sm">Basic info</span>
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "tab-2" && "border-b-2 border-blue-600"
                }`}
                onClick={() => setActiveTab("tab-2")}
              >
                <span className="font-Poppins text-sm">Update Password</span>
              </button>
            </div>

            {activeTab === "tab-1" && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    className="w-full bg-white/70"
                    value={userInfo?.fullName}
                  />
                  <Button>Change</Button>
                </div>

                <div className="flex gap-2">
                  <Input
                    className="w-full bg-white/70"
                    value={userInfo?.email}
                  />
                  <Button>Change</Button>
                </div>

                <div className="flex gap-2">
                  <Input
                    className="w-full bg-white/70"
                    value={userInfo?.username}
                  />
                  <Button>Change</Button>
                </div>
              </div>
            )}

            {activeTab === "tab-2" && (
              <div>
                <form className="space-y-2">
                  <div className="flex flex-col gap-2">
                    <Input
                      className="w-full font-Poppins text-sm bg-white/70"
                      placeholder="Enter current Password"
                      label="Current Password"
                    />
                    <Input
                      className="w-full font-Poppins text-sm bg-white/70"
                      label="New Password"
                      placeholder="Enter new password"
                    />
                    <Input
                      className="w-full font-Poppins text-sm bg-white/70"
                      label="Confirm Password"
                      placeholder="Re-enter password"
                    />
                  </div>

                  <Button>Change Password</Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
