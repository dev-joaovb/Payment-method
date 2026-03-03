import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function PayPal_v6() {
  const { id } = useParams();

  // useMemo evita que o script do PayPal reinicie toda vez que o componente renderizar
  const initialOptions = useMemo(() => ({
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "BRL",
    intent: "capture",
  }), []);

  const onCreateOrder = async () => {
    try {
      console.log("🚀 Iniciando ordem para o produto:", id);
      const res = await axios.post("http://localhost:5000/api/payments/card/create", {
        productId: id
      });

      if (!res.data.id) throw new Error("ID da ordem não retornado pelo servidor.");
      return res.data.id; 
    } catch (err) {
      const backendError = err.response?.data?.message || err.message;
      console.error("❌ Erro no Backend:", backendError);
      alert(`Erro ao criar pedido: ${backendError}`);
      throw err; // Importante para o PayPal saber que falhou
    }
  };

  const onApprove = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/payments/capture", {
        orderID: data.orderID,
      });

      if (res.data.status === "COMPLETED") {
        alert("✅ Pagamento aprovado com sucesso!");
        // Opcional: window.location.href = "/obrigado";
      }
    } catch (err) {
      console.error("❌ Erro na captura:", err);
      alert("Pagamento processado, mas houve um erro na confirmação interna.");
    }
  };

  // Se o ID estiver vindo vazio da URL, avisamos o usuário
  if (!id) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Erro: Produto não identificado.</h3>
        <p>A URL correta deve ser /v6/ID_DO_PRODUTO</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      padding: "20px",
      minHeight: "250px" 
    }}>
      <h2 style={{ marginBottom: "20px" }}>Finalizar Pagamento</h2>
      
      <div style={{ width: "100%", maxWidth: "350px" }}>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ 
              layout: "vertical", 
              color: "blue", 
              shape: "rect",
              label: "pay" 
            }}
            createOrder={onCreateOrder}
            onApprove={onApprove}
            onError={(err) => {
              console.error("🚨 Erro crítico no SDK:", err);
              alert("Não foi possível carregar o PayPal. Verifique sua conexão ou Client ID.");
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}