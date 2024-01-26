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
          <img className="logo" src={imageUrl} alt="selected logo" />
        ) : (
          <div className="logo-placeholder">
            <p>No Logo Selected</p>
          </div>
        )}

        <form className="form-container" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="logo-input" className="logo-input">
              {imageFile ? "Change Logo" : "Select Logo"}
            </label>

            <input
              id="logo-input"
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
