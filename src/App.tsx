import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import UploadLogoPage from "./pages/UploadLogoPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <main className="content-container-sm">
      <Router>
        <h1 className="text-xxl text-center">Real Byte</h1>
        <Routes />
      </Router>
    </main>
  );
};

export default App;

function Routes() {
  return useRoutes([
    {
      path: "/upload-logo/:userPhoneNumber",
      element: <UploadLogoPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
}
