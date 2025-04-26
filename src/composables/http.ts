import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'


const API_BASE_URL = "http://127.0.0.1:3000/medi/api/";

export const useRequest = async <T = any>(
  config: Partial<AxiosRequestConfig & { shouldUseSessionToken?: boolean }>
): Promise<AxiosResponse<T>> => {
  const {
    url,
    method = "GET",
    data = {},
    headers = {},
    shouldUseSessionToken = true,
    baseURL = API_BASE_URL,
    ...restConfig
  } = config;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };
  const authToken = localStorage.getItem("token");
  requestHeaders['Authorization'] = `Bearer ${authToken}`
  if (shouldUseSessionToken) {
    const sessionToken = localStorage.getItem("session");
    if (sessionToken) {
      requestHeaders["Authorization"] = `Bearer ${sessionToken}`;
    }
  }

  return axios({
    baseURL,
    url,
    method,
    headers: requestHeaders,
    data,
    ...restConfig,
  });
};
