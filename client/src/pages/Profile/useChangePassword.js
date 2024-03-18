import { axiosConfig } from "../../utils/axios/axiosConfig";

const useChangePassword = async (data) => {
  const response = await axiosConfig.post(
    "/api/v1/users/change-password",
    data,
    {
      withCredentials: true,
    }
  );

  return response;
};

export default useChangePassword;
