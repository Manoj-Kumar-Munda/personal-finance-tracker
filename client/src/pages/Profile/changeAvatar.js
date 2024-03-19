import { axiosConfig } from "../../utils/axios/axiosConfig";

const changeAvatar = async (newAvatar) => {
  const formData = new FormData();
  formData.append("newAvatar", newAvatar);
  return await axiosConfig.patch("/api/v1/users/avatar", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default changeAvatar;
