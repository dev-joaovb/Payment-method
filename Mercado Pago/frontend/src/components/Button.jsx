import React from "react";
import axios from "axios";

const Button = () => {
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/create-session"
      );

      window.location.href = data.init_point;
    } catch (error) { 
      
      console.error("Deu erro na requisição", error);
    }
  };

  return <button onClick={handleSubmit}>Pagar com MercadoPago</button>;
};

export default Button;
