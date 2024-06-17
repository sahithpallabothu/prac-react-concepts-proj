import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const respData = await response.json();

  if (!response.ok) {
    throw new Error(
      respData.message || "Something went wrong Failed to send request."
    );
  }

  return respData;
}

export default function useHttp(url, config, initalData) {
  const [data, setData] = useState(initalData);
  const [error, setError] = useState();
  const [fetching, setIsFetching] = useState(false);

  function clearData() {
    setData(initalData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsFetching(true);
      try {
        const respData = await sendHttpRequest(url, {
          ...config,
          body: JSON.stringify(data),
        });
        setData(respData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsFetching(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    fetching,
    sendRequest,
    clearData,
  };
}
