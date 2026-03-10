import React from "react";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="home">
      <div className="produtos">
        <b>Produtos selecionados: </b>
        <p>Full Stack Impressionador - R$ 1.497 </p>
      </div>

      <Button />
    </div>
  );
};

export default Home;
