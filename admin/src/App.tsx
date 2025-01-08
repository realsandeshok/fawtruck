import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/component/Login/page";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import AboutUs from "./components/component/AboutUs";
import Banner from "./components/component/Banner";
import TruckModels from "./components/component/TruckModels";
import Enquires from "./components/component/Enquires";

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
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <AboutUs/>
          </PrivateRoute>
        }
      />
      <Route
        path="/banner"
        element={
          <PrivateRoute>
            <Banner />
          </PrivateRoute>
        }
      />
      <Route
        path="/truckmodels"
        element={
          <PrivateRoute>
            <TruckModels />
          </PrivateRoute>
        }
      />
      <Route
        path="/enquires"
        element={
          <PrivateRoute>
            <Enquires/>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
