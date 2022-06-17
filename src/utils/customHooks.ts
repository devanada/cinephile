import { useEffect, useState } from "react";

const useFetchGet = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

const useChangeComponent = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setTheme("light");
  }, [theme]);

  return [theme];
};

export { useFetchGet, useChangeComponent };
