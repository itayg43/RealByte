import { useCallback, useState } from "react";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_IMAGE_SIZE_IN_MB = 5 * 1024 * 1024;

const useImagePicker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === undefined) {
      return;
    }

    const f = e.target.files[0];

    if (ALLOWED_IMAGE_TYPES.includes(f.type) === false) {
      alert("Only JPEG, and PNG images are allowed");
      return;
    }

    if (f.size > MAX_IMAGE_SIZE_IN_MB) {
      alert("Images with maximum size of 5MB is allowed");
      return;
    }

    setFile(f);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null) {
        return;
      }

      const { result } = e.target;

      if (result !== null && typeof result === "string") {
        setUrl(result);
      }
    };
    reader.readAsDataURL(f);
  }, []);

  return {
    imageFile: file,
    imageUrl: url,
    handleImageChange: handleChange,
  };
};

export default useImagePicker;
