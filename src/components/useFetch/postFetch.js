import { useState, useEffect } from 'react';

const postFetch = ({ url, token, ...data }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://6687c8f30bc7155dc019177c.mockapi.io/${url}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setResult(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [url, token, data]);

  return { data: result, loading, error };
};

export default postFetch;
