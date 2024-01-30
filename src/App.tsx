import { useEffect, useState } from "react";

import LogoForm, { LogoFormInputs } from "./components/forms/LogoForm";

import apiService from "./services/apiService";
import { RequestStatus } from "./utils/types";

const REDIRECT_TIME_OUT_IN_MILLIS = 3000;

const App = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const handleSubmit = async (inputs: LogoFormInputs) => {
    if (userPhoneNumber === null) return;

    try {
      setRequestStatus("loading");
      await apiService.uploadLogo(userPhoneNumber, inputs.logo[0]);
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

  useEffect(() => {
    let timeout: NodeJS.Timeout | null;

    if (requestStatus === "succeeded") {
      timeout = setTimeout(() => {
        window.location.replace(
          process.env.REACT_APP_WHATSAPP_URL ?? window.location.href
        );
      }, REDIRECT_TIME_OUT_IN_MILLIS);
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [requestStatus]);

  return (
    <main>
      <div className="content-container-sm">
        <h1 className="text-xxl text-center">Real Byte</h1>

        {requestStatus === "succeeded" ? (
          <p className="text-center">
            Upload succeeded! You will be redirected to WhatsApp shortly...
          </p>
        ) : (
          <LogoForm onSubmit={handleSubmit} />
        )}
      </div>
    </main>
  );
};

export default App;
