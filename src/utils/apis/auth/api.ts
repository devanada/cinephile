import axiosWithConfig from "@/utils/apis/axiosWithConfig";

export const postLogin = async (body: any) => {
  try {
    const response = await axiosWithConfig.post(
      `/authentication/token/validate_with_login`,
      body
    );

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.status_message);
  }
};

export const getRequestToken = async () => {
  try {
    const response = await axiosWithConfig.get(`/authentication/token/new`);

    const { request_token } = response.data;

    return request_token;
  } catch (error: any) {
    throw Error("Failed to get request token");
  }
};

export const createSessionID = async (request_token: string) => {
  const body = {
    request_token,
  };
  try {
    const response = await axiosWithConfig.post(
      `/authentication/session/new`,
      body
    );

    const { session_id } = response.data;

    return session_id;
  } catch (error: any) {
    throw Error("Failed to get session id");
  }
};

export const getDetailAccount = async (session_id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `/account?session_id=${session_id}`
    );

    const { id } = response.data;

    return id;
  } catch (error: any) {
    throw Error("Failed to get detail account");
  }
};
