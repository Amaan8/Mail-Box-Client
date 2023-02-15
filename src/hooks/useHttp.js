import { useCallback } from "react";

const useHttp = () => {
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      if (applyData) {
        applyData(data);
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  return sendRequest;
};

export default useHttp;
