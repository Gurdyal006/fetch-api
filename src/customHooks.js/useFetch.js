import React, { useEffect, useState } from "react";

export default function useFetch(fetchFun, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchData, setFetchData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFun();
        setFetchData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch api error...." });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFun]);

  return {
    isFetching,
    fetchData,
    setFetchData,
    error,
  };
}
