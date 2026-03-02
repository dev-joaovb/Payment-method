import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import CardPage from "./pages/CardPage";
import BoletoPage from "./pages/BoletoPage";
import PayPal_v6 from "./components/PayPal_v6";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/boleto" element={<BoletoPage />} />
          <Route path="/v6" element={<PayPal_v6 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
