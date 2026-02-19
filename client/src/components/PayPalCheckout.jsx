import { useEffect, useRef } from "react";
import { createOrder, captureOrder } from "../services/paymentService";

/**
 * Componente responsável por renderizar botão PayPal
 */
export default function PayPalCheckout({ amount }) {
  const paypalRef = useRef();

  useEffect(() => {

    // Verifica se SDK foi carregado
    if (!window.paypal) return;

    window.paypal.Buttons({

      /**
       * Criação da ordem
       */
      createOrder: async () => {
        try {
          const orderID = await createOrder(amount);
          return orderID;
        } catch (error) {
          console.error("Erro ao criar ordem:", error);
        }
      },

      /**
       * Captura após aprovação
       */
      onApprove: async (data) => {
        try {
          const details = await captureOrder(data.orderID);
          console.log("Pagamento concluído:", details);
          alert("Pagamento realizado com sucesso!");
        } catch (error) {
          console.error("Erro ao capturar:", error);
        }
      },

      /**
       * Tratamento de erro
       */
      onError: (err) => {
        console.error("Erro PayPal:", err);
      }

    }).render(paypalRef.current);

  }, [amount]);

  return <div ref={paypalRef}></div>;
}
