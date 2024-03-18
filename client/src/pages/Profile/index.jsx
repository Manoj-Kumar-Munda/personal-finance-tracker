import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import UpdatePassword from "./UpdatePassword";
import BasicInfo from "./BasicInfo";
import UpdateEmail from "./UpdateEmail";

const Profile = () => {
  console.log("Profile called..")
  const { userInfo } = useSelector((store) => store.auth);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const [activeTab, setActiveTab] = useState("tab-1");


  return (
    <div className=" relative bg-gradient-to-br from-[#abdcff] to-[#0396ff]">
      <div className="max-w-screen-lg mx-auto my-4 space-y-6 px-2 ">
        <h1 className="text-3xl font-bold font-Poppins text-slate-700">
          Profile
        </h1>
        <div className="border flex gap-4 flex-wrap bg-white/20 backdrop-blur-xl px-3 md:px-6 py-4 md:py-8 rounded-2xl divide-x-0 md:divide-x md:divide-white">
          <div className="flex flex-col items-center basis-full md:basis-3/12 min-w-fit">
            <img
              src={preview ? preview : userInfo?.avatar}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <label
                htmlFor="avatar"
                className=" my-2 flex items-center gap-1 font-Poppins font-light text-sm bg-white/60 transition-all hover:bg-white cursor-pointer py-2 px-2 rounded-lg"
              >
                Change Avatar{" "}
                <span>
                  <FaRegEdit />
                </span>
              </label>

              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={onSelectFile}
              />
            </div>
          </div>

          <div className="md:pl-3 space-y-4 grow">
            <h2 className="text-xl font-bold font-Poppins text-slate-700">Basic info</h2>
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

            {activeTab === "tab-1" && <UpdateEmail />}

            {activeTab === "tab-2" && <UpdatePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
