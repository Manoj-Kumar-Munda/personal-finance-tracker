import axios from "axios";
import { axiosConfig } from "../../utils/axios/axiosConfig";

const useLogin = async ( { data }) => {
    const response = await axiosConfig.post("/users/register", data )
}