import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}/api`,
});

export const formDataConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export enum ApiRoute {
  uploadLogo = "/upload-logo",
}

export default apiClient;
