import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function PayPal_v6() {
  const { id } = useParams();

  // Se não houver ID na URL, podemos definir um padrão para testes ou nulo
  const productId = id || null;

  const initialOptions = useMemo(() => ({
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "BRL",
    intent: "capture",
  }), []);

  const onCreateOrder = async () => {
    if (!productId) {
      alert("Erro: Nenhum produto selecionado para compra.");
      return;
    }

    try {
      console.log("🛒 Criando ordem para:", productId);
      const res = await axios.post("http://localhost:5000/api/payments/card/create", {
        productId: productId
      });
      return res.data.id;
    } catch (err) {
      console.error("❌ Erro ao criar ordem:", err.response?.data || err.message);
      throw err;
    }
  };

  const onApprove = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/payments/capture", {
        orderID: data.orderID,
      });
      if (res.data.status === "COMPLETED") {
        alert("🎉 Pagamento realizado com sucesso!");
      }
    } catch (err) {
      console.error("❌ Erro na captura:", err);
      alert("Erro ao confirmar pagamento no servidor.");
    }
  };

  return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!productId ? (
        <div style={{ color: "red", textAlign: "center" }}>
          <h2>Atenção!</h2>
          <p>Você acessou a página de pagamento sem selecionar um produto.</p>
          <p>Use a URL no formato: <b>/v6/ID_DO_PRODUTO</b></p>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "350px" }}>
          <h2 style={{ textAlign: "center" }}>Finalizar Compra</h2>
          <br />
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "rect" }}
              createOrder={onCreateOrder}
              onApprove={onApprove}
              onError={(err) => console.error("PayPal Script Error:", err)}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
}