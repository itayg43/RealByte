import { useState } from "react";
import { useParams } from "react-router-dom";

import { RequestStatus } from "../utils/types";
import apiService from "../services/apiService";
import UploadLogoForm, {
  type UploadLogoFormInputs,
} from "../components/forms/UploadLogoForm";

const REDIRECT_DELAY_IN_MILLIS = 1500;

const UploadLogoPage = () => {
  const { userPhoneNumber } = useParams();

  const [uploadStatus, setUploadStatus] = useState<RequestStatus>("idle");

  const handleUpload = async (inputs: UploadLogoFormInputs) => {
    if (userPhoneNumber === undefined) return;

    try {
      setUploadStatus("loading");
      await apiService.uploadLogo(userPhoneNumber, inputs.file[0]);
      setTimeout(redirectToWhatsapp, REDIRECT_DELAY_IN_MILLIS);
      setUploadStatus("succeeded");
    } catch (error: any) {
      setUploadStatus("failed");
      alert(error?.message);
    }
  };

  return (
    <>
      {uploadStatus === "succeeded" ? (
        <p className="text-center">
          Upload succeeded! You will be redirected to WhatsApp shortly...
        </p>
      ) : (
        <UploadLogoForm onSubmit={handleUpload} />
      )}
    </>
  );
};

export default UploadLogoPage;

function redirectToWhatsapp() {
  const url = process.env.REACT_APP_WHATSAPP_URL;
  if (url === undefined) return;
  window.location.replace(url);
}
