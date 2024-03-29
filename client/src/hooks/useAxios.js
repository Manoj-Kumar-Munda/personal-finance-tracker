import { useEffect, useState } from "react";
import { axiosConfig } from "../utils/axios/axiosConfig";

const useAxios = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get(url);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error)
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useAxios;
