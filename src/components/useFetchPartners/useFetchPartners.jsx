import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFetchPartners = (data) => {
  const [partners, setPartners] = useState({});
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchPartners = async () => {
        const partnerData = {};
        await Promise.all(
          data.map(async (row) => {
            if (!partners[row.user_id]) {
              try {
                const response = await axios.get(
                  `https://newnewterminal.onrender.com/api/users/${row.user_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                partnerData[row.user_id] = response.data.username;
              } catch (error) {
                console.error(`Error fetching partner data: ${error}`);
              }
            }
          })
        );
        setPartners(partnerData);
      };

      fetchPartners();
    }
  }, [data, token]);

  return partners;
};

export default useFetchPartners;
