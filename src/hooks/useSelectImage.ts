import { useCallback, useState } from "react";

const useSelectImage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files === null || e.target.files[0] === undefined) return;

      const file = e.target.files[0];

      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          setImageUrl(e.target.result);
        }
      });
    },
    []
  );

  return {
    imageFile,
    imageUrl,
    handleImageFileChange,
  };
};

export default useSelectImage;
