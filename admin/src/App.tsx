import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AboutUsPage from "./components/pages/about-us";
import BannerPage from "./components/pages/banner";
import TruckModelsPage from "./components/pages/truck-models";
import LoginPage from "./components/component/Login/page";
import { Toaster } from "react-hot-toast";
import { EnquiresPage } from "./components/pages/enquires";
import { useEffect, useState } from "react";

// PrivateRoute to handle protected routes
function PrivateRoute({ children }: { children: JSX.Element }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken(); // Check token on initial load

    const handleStorageChange = () => {
      checkToken(); // Listen for token changes across tabs
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Render either the children if logged in, or redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <AboutUsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/banner"
        element={
          <PrivateRoute>
            <BannerPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/truckmodels"
        element={
          <PrivateRoute>
            <TruckModelsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/enquires"
        element={
          <PrivateRoute>
            <EnquiresPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
