import axios from "axios";

const useLogin = async (data) => {
  const response = await axios.post(
    "/api/v1/users/login",
    data
  );

  return response;
};

export default useLogin;
