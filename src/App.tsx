import axios from "axios";

import useSelectImage from "./hooks/useSelectImage";

const apiClient = axios.create({
  baseURL: "",
});

const App = () => {
  const { imageFile, imageUrl, handleImageFileChange } = useSelectImage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageFile === null) return;

    const formData = new FormData();
    formData.append("file", imageFile, imageFile.name);

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

        {imageUrl && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={imageUrl} alt="selected image" />
        )}

        <form className="form-container" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="image-input" className="image-input">
              {imageFile ? "Change Image" : "Select Image"}
            </label>

            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
            />
          </fieldset>

          <button
            className="button"
            type="submit"
            disabled={imageFile === null}
          >
            Upload
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
