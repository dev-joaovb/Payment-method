import { useEffect, useRef } from "react";
import { createOrder, captureOrder } from "../services/paymentService";

/**
 * Checkout com Cartão direto no site
 */
export default function CardCheckout({ amount }) {

  const cardContainerRef = useRef();

  useEffect(() => {

    if (!window.paypal || !window.paypal.CardFields) {
      console.error("CardFields não disponível.");
      return;
    }

    const cardFields = window.paypal.CardFields({

      /**
       * Criação da ordem no backend
       */
      createOrder: async () => {
        const orderID = await createOrder(amount);
        return orderID;
      },

      /**
       * Aprovação do pagamento
       */
      onApprove: async (data) => {
        const details = await captureOrder(data.orderID);
        console.log("Pagamento concluído:", details);
        alert("Pagamento aprovado com cartão!");
      },

      /**
       * Tratamento de erro
       */
      onError: (err) => {
        console.error("Erro no pagamento:", err);
      }

    });

    // Renderização dos campos individuais
    if (cardFields.isEligible()) {

      cardFields.NumberField().render("#card-number");
      cardFields.ExpiryField().render("#card-expiry");
      cardFields.CVVField().render("#card-cvv");
      cardFields.NameField().render("#card-name");

      cardFields.render(cardContainerRef.current);
    }

  }, [amount]);

  return (
    <div>
      <h2>Pagamento com Cartão</h2>

      <div>
        <label>Número do Cartão</label>
        <div id="card-number" className="input-style"></div>
      </div>

      <div>
        <label>Validade</label>
        <div id="card-expiry" className="input-style"></div>
      </div>

      <div>
        <label>CVV</label>
        <div id="card-cvv" className="input-style"></div>
      </div>

      <div>
        <label>Nome no Cartão</label>
        <div id="card-name" className="input-style"></div>
      </div>

      <div ref={cardContainerRef}></div>
    </div>
  );
}
