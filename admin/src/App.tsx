import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsPage from "./components/pages/about-us";
import BannerPage from "./components/pages/banner";
import TruckModelsPage from "./components/pages/truck-models";
import LoginPage from "./components/component/Login/page";
import { Toaster } from "react-hot-toast";
import { EnquiresPage } from "./components/pages/enquires";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/banner" element={<BannerPage />} />
          <Route path="/truckmodels" element={<TruckModelsPage />} />
          <Route path="/enquires" element={<EnquiresPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
