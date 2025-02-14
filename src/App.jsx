import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";

import HomePage from "./pages/HomePage";
import AddProperty from "./pages/AddProperty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="Soggiorni" element={<h2>soggiorni</h2>} />
          <Route path="Esperienze" element={<h2>Esperienze</h2>} />
          <Route path="Affitta" element={<h2>Affitta</h2>} />

          <Route index element={<HomePage />} />

          <Route path="AddProperty" element={<AddProperty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
