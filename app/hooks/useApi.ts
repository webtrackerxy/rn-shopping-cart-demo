import { useState } from "react";

type ApiFuncProp = (...args: any[]) => Promise<{ok: boolean, data: any}>;

const useApi = (apiFunc: ApiFuncProp) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) return setError(true);

    setError(false);
    setData(response.data);
  };

  return { data, error, loading, request };
};

export default useApi;
