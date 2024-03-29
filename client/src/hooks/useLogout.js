import { axiosConfig } from "../utils/axios/axiosConfig";

const useLogout = async () => {
  const res = await axiosConfig.post("/api/v1/users/logout", {
    withCredentials: true
  });
};

export default useLogout;
