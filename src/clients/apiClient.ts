import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "https://4ceb-109-65-129-142.ngrok-free.app/api",
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
