import apiClient, { formDataConfig, ApiRoute } from "../clients/apiClient";

const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image, image.name);

    await apiClient.post(ApiRoute.uploadImage, formData, formDataConfig);
  } catch (error) {
    console.error(error);
    throw new Error("Error: uploading image failed.");
  }
};

const functions = {
  uploadImage,
};

export default functions;
