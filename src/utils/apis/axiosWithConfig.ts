import axios from "axios";

interface Queries {
  api_key: any;
  language: string;
  session_id?: string;
}

let session_id = "";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  session_id = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  let queries: Queries = {
    api_key: import.meta.env.VITE_API_KEY,
    language: "en-US",
  };

  if (session_id !== "") {
    queries["session_id"] = session_id;
  }

  axiosConfig.baseURL = "https://api.themoviedb.org/3/";
  axiosConfig.params = {
    ...axiosConfig.params,
    ...queries,
  };

  return axiosConfig;
});

export default axiosWithConfig;
