import { axiosConfig } from "../../utils/axios/axiosConfig";

const useChangePassword = async (data) => {
  return await axiosConfig.post(
    "/api/v1/users/change-password",
    data,
    {
      withCredentials: true,
    }
  );

 ;
};

export default useChangePassword;
