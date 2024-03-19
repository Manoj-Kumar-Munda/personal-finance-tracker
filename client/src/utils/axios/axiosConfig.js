import axios from "axios";

const axiosConfig = axios.create({});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response.status === 401) {
      await axios
        .post("/api/v1/users/refresh", {
          withCredentials: true,
        })
        .catch((refrehTokenAPIError) => {
          return Promise.reject(refrehTokenAPIError);
        });
      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

export { axiosConfig };
