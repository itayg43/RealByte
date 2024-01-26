import { useCallback, useState } from "react";

const useImagePicker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === undefined) {
      return;
    }

    const f = e.target.files[0];

    setFile(f);

    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.addEventListener("load", (e) => {
      if (e.target === null) {
        return;
      }

      const { result } = e.target;

      if (result !== null && typeof result === "string") {
        setUrl(result);
      }
    });
  }, []);

  return {
    imageFile: file,
    imageUrl: url,
    handleImageChange: handleChange,
  };
};

export default useImagePicker;
