import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const formDataConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export enum ApiRoute {
  uploadImage = "/upload-image",
}

export default apiClient;
