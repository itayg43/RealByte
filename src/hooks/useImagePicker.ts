import { useCallback, useEffect, useState } from "react";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_IMAGE_SIZE_IN_BYTES = 5 * 1024 * 1024;

const useImagePicker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === undefined) {
      return;
    }

    const f = e.target.files[0];

    if (validateType(f.type) === false) {
      alert("Only JPEG, and PNG images are allowed");
      return;
    }

    if (validateSize(f.size) === false) {
      alert("Images with maximum size of 5MB is allowed");
      return;
    }

    setFile(f);
  }, []);

  useEffect(() => {
    let isCancel = false;
    let reader: FileReader | null;

    if (file === null) {
      return;
    }

    reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null) {
        return;
      }

      const { result } = e.target;

      if (isCancel === false && result !== null && typeof result === "string") {
        setUrl(result);
      }
    };
    reader.readAsDataURL(file);

    return () => {
      isCancel = true;

      // 1 === LOADING
      if (reader !== null && reader.readyState === 1) {
        reader.abort();
      }
    };
  }, [file]);

  return {
    imageFile: file,
    imageUrl: url,
    handleImageChange: handleChange,
  };
};

export default useImagePicker;

function validateType(type: string) {
  return ALLOWED_IMAGE_TYPES.includes(type);
}

function validateSize(size: number) {
  return size < MAX_IMAGE_SIZE_IN_BYTES;
}
