import { useEffect, useState } from "react";

import { RequestStatus } from "../utils/types";
import apiService from "../services/apiService";
import UploadLogoForm, {
  type UploadLogoFormInputs,
} from "../components/forms/UploadLogoForm";

const REDIRECT_TIME_OUT_IN_MILLIS = 3000;

const UploadLogoPage = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const handleSubmit = async (inputs: UploadLogoFormInputs) => {
    if (userPhoneNumber === null) return;

    try {
      setRequestStatus("loading");
      await apiService.uploadLogo(userPhoneNumber, inputs.file[0]);

      setTimeout(() => {
        window.location.replace(
          process.env.REACT_APP_WHATSAPP_URL ?? window.location.href
        );
      }, REDIRECT_TIME_OUT_IN_MILLIS);

      setRequestStatus("succeeded");
    } catch (error: any) {
      setRequestStatus("failed");
      alert(error?.message);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setUserPhoneNumber(searchParams.get("phoneNumber"));
  }, []);

  return (
    <div className="content-container-sm">
      <h1 className="text-xxl text-center">Real Byte</h1>

      {requestStatus === "succeeded" ? (
        <p className="text-center">
          Upload succeeded! You will be redirected to WhatsApp shortly...
        </p>
      ) : (
        <UploadLogoForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default UploadLogoPage;
