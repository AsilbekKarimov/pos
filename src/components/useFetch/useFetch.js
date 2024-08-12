import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const useFetch = (url, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newnewterminal.onrender.com/api/${url}/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token, id]);

  return { data, loading, error };
};

export default useFetch;
