import apiClient, { formDataConfig, ApiRoute } from "../clients/apiClient";
import { UploadLogoFormInputs } from "../components/forms/UploadLogoForm";

const uploadLogo = async (
  userPhoneNumber: string,
  formInputs: UploadLogoFormInputs
) => {
  try {
    const formData = new FormData();
    formData.append("phoneNumber", userPhoneNumber);
    formData.append("file", formInputs.file, formInputs.file.name);

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
