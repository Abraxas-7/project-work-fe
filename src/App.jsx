import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";

import HomePage from "./pages/HomePage";
import PropertyDetails from "./pages/PropertyDetails";
import AdvancedSearch from "./pages/AdvancedSearch";
import AddProperty from "./pages/AddProperty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="advancedSearch" element={<AdvancedSearch />} />
          <Route path="Soggiorni" element={<h2>soggiorni</h2>} />
          <Route path="Esperienze" element={<h2>Esperienze</h2>} />
          <Route path="Affitta" element={<AddProperty />} />

          <Route path="properties/:id" element={<PropertyDetails />} />

          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
