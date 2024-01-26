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

        {imageUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img className="image" src={imageUrl} alt="selected image" />
        ) : (
          <div className="image-placeholder">
            <p>No Image Selected</p>
          </div>
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
            className="btn btn-blue"
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
