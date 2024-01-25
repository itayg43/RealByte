import { useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
});

const App = () => {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      setSelectedImageFile(imageFile);

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener("load", (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          setSelectedImageUrl(e.target.result);
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedImageFile === null) return;

    const formData = new FormData();
    formData.append("file", selectedImageFile, selectedImageFile.name);

    await apiClient.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <main>
      <div className="content-container-sm">
        <h1 className="text-xxl text-center">Real Estate</h1>

        {selectedImageUrl && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={selectedImageUrl} alt="selected image" />
        )}

        <form className="form-container" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="image-input" className="image-input">
              {selectedImageFile ? "Change Image" : "Select Image"}
            </label>

            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageInputChange}
            />
          </fieldset>

          <button
            className="button"
            type="submit"
            disabled={selectedImageFile === null}
          >
            Upload
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
