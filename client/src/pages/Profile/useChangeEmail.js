import { axiosConfig } from "../../utils/axios/axiosConfig";

const useChangeEmail = async (newEmail) => {
  return await axiosConfig.patch("/api/v1/users/email", newEmail, {
    withCredentials: true,
  });
};

export default useChangeEmail;