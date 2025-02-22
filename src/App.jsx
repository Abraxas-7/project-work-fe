import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import ScrollToTop from "./components/ScrollBarComponents/ScrollToTop";
import HomePage from "./pages/HomePage";
import PropertyDetails from "./pages/PropertyDetails";
import AdvancedSearch from "./pages/AdvancedSearch";
import AddProperty from "./pages/AddProperty";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="advancedSearch" element={<AdvancedSearch />} />
          <Route path="Affitta" element={<AddProperty />} />
          <Route path="properties/:id" element={<PropertyDetails />} />

          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
