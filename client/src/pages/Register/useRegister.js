import axios from "axios";

export const useRegister = async (data) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("avatar", data.avatar[0]);

  const response = await axios.post(
    "/api/v1/users/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};
