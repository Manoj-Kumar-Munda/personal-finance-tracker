import { axiosConfig } from "../utils/axios/axiosConfig";

const useLogout = async () => {
  const res = await axiosConfig.post("/api/v1/users/logout", {
    withCredentials: true
  });

  console.log("logout res: ", res);
};

export default useLogout;
