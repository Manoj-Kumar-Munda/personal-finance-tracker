import { axiosConfig } from "../utils/axios/axiosConfig"

const useChangePassword = async() => {
    const response = await axiosConfig.post("/api/v1/users/change-password", {
        withCredentials: true
    })

    console.log("response: ",response)
}

export default useChangePassword;