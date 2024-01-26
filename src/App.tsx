import apiService from "./services/apiService";
import useImagePicker from "./hooks/useImagePicker";

const App = () => {
  const { imageFile, imageUrl, handleImageChange } = useImagePicker();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageFile === null) {
      return;
    }

    try {
      await apiService.uploadImage(imageFile);
    } catch (error: any) {
      alert(error?.message);
    }
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
              onChange={handleImageChange}
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
