import axios, { AxiosInstance } from "axios";

/**
 * isDev returns a boolean if the application is running in development-mode.
 */
const isDev = (): boolean => !process.env.NODE_ENV || process.env.NODE_ENV === "development";

/**
 * Create an Axios instance for the api.
 */
const createAPI = (): AxiosInstance => {
  return axios.create({ baseURL: process.env.REACT_APP_BASEURL });
};

/**
 * api constant is the axios-instance used for all requests to the rest-api.
 */
const api: AxiosInstance = createAPI();

/**
 * Set the Authorization header on each request equal to the token which
 * is stored inside the localStorage if a user is authenticated.
 */
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Log outgoing requests if the environment is in development-mode
 */
api.interceptors.request.use((request) => {
  if (isDev() && request.method) {
    const info = `REQUEST ${request.method.toLocaleUpperCase()} ${request.url}`;
    if (request.method.toLocaleLowerCase() === "get") {
      console.debug(info);
    } else {
      console.debug(info, request.data);
    }
  }
  return request;
}, Promise.reject);

/**
 * Log incoming responses if the environment is in development-mode
 */
api.interceptors.response.use(
  (response) => {
    if (isDev() && response.config && response.config.method) {
      console.debug(
        `RESPONSE ${response.config.method.toLocaleUpperCase()} ${response.config.url}`,
        response.data
      );
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
