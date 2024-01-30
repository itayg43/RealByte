import { useEffect, useState } from "react";

import type { RequestStatus } from "./utils/types";
import apiService from "./services/apiService";
import useImagePicker, { ALLOWED_IMAGE_TYPES } from "./hooks/useImagePicker";

const REDIRECT_TIME_OUT_IN_MILLIS = 3000;
const REDIRECT_TIME_OUT_IN_SECONDS = REDIRECT_TIME_OUT_IN_MILLIS / 1000;

const App = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);

  const { imageFile, imageUrl, handleImageChange } = useImagePicker();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userPhoneNumber === null || imageFile === null) {
      return;
    }

    try {
      setRequestStatus("loading");
      await apiService.uploadImage(userPhoneNumber, imageFile);
      setRequestStatus("succeeded");
    } catch (error: any) {
      setRequestStatus("failed");
      alert(error?.message);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const pn = searchParams.get("phoneNumber");
    console.log(pn);
    setUserPhoneNumber(pn);
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

        {requestStatus === "succeeded" && (
          <p className="text-center">
            Upload succeeded! You will be redirected to WhatsApp in{" "}
            {REDIRECT_TIME_OUT_IN_SECONDS} seconds...
          </p>
        )}

        {requestStatus !== "succeeded" && (
          <>
            {imageUrl && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img className="image" src={imageUrl} alt="selected image" />
            )}

            <form className="form-container" onSubmit={handleSubmit}>
              <fieldset>
                <label htmlFor="image-input" className="image-input">
                  {imageFile ? "Change Logo" : "Select Logo"}
                </label>

                <input
                  id="image-input"
                  type="file"
                  accept={ALLOWED_IMAGE_TYPES.join(",")}
                  onChange={handleImageChange}
                />
              </fieldset>

              {imageFile && (
                <button
                  className="btn btn-blue"
                  type="submit"
                  disabled={requestStatus === "loading"}
                >
                  {requestStatus === "loading" && <span className="loader" />}
                  UPLOAD
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
