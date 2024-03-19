import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdatePassword from "./UpdatePassword";
import BasicInfo from "./BasicInfo";
import UpdateEmail from "./UpdateEmail";
import UpdateAvatar from "./UpdateAvatar";

const Profile = () => {
  const { userInfo } = useSelector((store) => store.auth);

  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <div className=" relative grid md:items-center bg-gradient-to-br from-[#abdcff] to-[#0396ff]">
      <div className="max-w-screen-lg w-full mx-auto space-y-6 px-2 py-2">
        <div className="border flex gap-4 flex-wrap bg-white/20 backdrop-blur-xl px-3 py-4 md:px-6 md:py-10 rounded-2xl divide-x-0 md:divide-x md:divide-white">
          <UpdateAvatar userInfo={userInfo}/>

          <div className="md:pl-3 space-y-4 grow">
            <h2 className="text-xl font-bold font-Poppins text-slate-700">
              Basic info
            </h2>
            <div>
              <BasicInfo />
            </div>
            <h2 className="text-xl font-bold font-Poppins text-slate-700 ">
              Update Profile
            </h2>

            <div className="flex bg-white/20 backdrop-blur-lg rounded-md overflow-hidden ">
              <button
                className={`px-4 py-2 ${
                  activeTab === "tab-1" && "border-b-2 border-blue-600"
                }`}
                onClick={() => setActiveTab("tab-1")}
              >
                <span className="font-Poppins text-sm">Update Email</span>
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

            {activeTab === "tab-1" && <UpdateEmail userInfo={userInfo} />}

            {activeTab === "tab-2" && <UpdatePassword  userInfo={userInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
