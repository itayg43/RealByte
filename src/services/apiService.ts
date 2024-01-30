import apiClient, { formDataConfig, ApiRoute } from "../clients/apiClient";

const uploadLogo = async (userPhoneNumber: string, image: File) => {
  try {
    const formData = new FormData();
    formData.append("phoneNumber", userPhoneNumber);
    formData.append("file", image, image.name);

    await apiClient.post(ApiRoute.uploadLogo, formData, formDataConfig);
  } catch (error) {
    console.error(error);
    throw new Error("Error: uploading image failed.");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  uploadLogo,
};
