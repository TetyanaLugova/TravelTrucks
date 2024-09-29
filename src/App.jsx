import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CamperDetails from "./pages/CamperDetails/CamperDetails";
import CatalogPage from "./pages/Catalog/Catalog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CamperDetails />} />
    </Routes>
  );
}

export default App;
