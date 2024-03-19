import { axiosConfig } from "../../utils/axios/axiosConfig";

const changeEmail = async (newEmail) => {
  return await axiosConfig.patch("/api/v1/users/email", newEmail, {
    withCredentials: true,
  });
};

export default changeEmail