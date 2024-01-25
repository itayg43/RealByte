import { useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
});

const App = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    setSelectedImage(file);
    setSelectedImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedImage === null) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

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
              {selectedImage ? "Change Image" : "Select Image"}
            </label>

            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
          </fieldset>

          <button
            className="button"
            type="submit"
            disabled={selectedImage === null}
          >
            Upload
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
