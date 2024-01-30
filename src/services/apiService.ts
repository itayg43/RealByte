import apiClient, { formDataConfig, ApiRoute } from "../clients/apiClient";

const uploadLogo = async (userPhoneNumber: string, logo: File) => {
  try {
    const formData = new FormData();
    formData.append("phoneNumber", userPhoneNumber);
    formData.append("file", logo, logo.name);

    await apiClient.post(ApiRoute.uploadLogo, formData, formDataConfig);
  } catch (error) {
    console.error(error);
    throw new Error("Error: uploading logo failed.");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  uploadLogo,
};
