import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";

import HomePage from "./pages/HomePage";
import AdvancedSearch from "./pages/AdvancedSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="advancedSearch" element={<AdvancedSearch />} />
          <Route path="Soggiorni" element={<h2>soggiorni</h2>} />
          <Route path="Esperienze" element={<h2>Esperienze</h2>} />
          <Route path="Affitta" element={<h2>Affitta</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
