import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import changeAvatar from "./changeAvatar";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../utils/slices/authSlice";
import ErrorMessge from "../../components/form/ErrorMessge";

const UpdateAvatar = ({ userInfo }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    uploadFile(selectedFile);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (newAvatar) => {
    try {
      const response = await changeAvatar(newAvatar);

      
      if (response?.status === 200) {

        console.log("response ", response?.data?.data);
        dispatch(setCredentials(response?.data.data));
      }
      setError(null);
    } catch (error) {
      if (error?.response) {
        setError(error?.response.data.message);
      } else {
        setError(error?.message);
      }
    }
  };

  return (
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
      { error && <ErrorMessge>{error}</ErrorMessge> }
    </div>
  );
};

export default UpdateAvatar;
