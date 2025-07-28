import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const resData = await fetch(url, {
          headers: {
            "Content/Types": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!resData.ok) throw new Error("Invalid token");
        const data = await resData.json();

        if (!data?.data?.user) throw new Error("Invalid response format");

        setData(data); 
      } catch (error) {
        throw new Error("Invalid response format");
      }
    })();

    return data;
  }, [url]);
}
