import apiClient, {
  formDataConfig,
  ApiClientRoute,
} from "../clients/apiClient";

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file, file.name);

    await apiClient.post(ApiClientRoute.uploadImage, formData, formDataConfig);
  } catch (error) {
    console.error(error);
    throw new Error("Error: uploading image failed.");
  }
};

const functions = {
  uploadImage,
};

export default functions;
