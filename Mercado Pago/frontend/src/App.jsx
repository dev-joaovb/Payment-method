import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sucesso from "./pages/Sucesso";
import Cancelado from "./pages/Cancelado";
import Pendente from "./pages/Pendente";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>Checkout do MercadoPago</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/cancelado" element={<Cancelado />} />
          <Route path="/pendente" element={<Pendente />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
