import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function PayPal_v6({ amount }) {
  const cardContainerRef = useRef(null);
  const [sdkInstance, setSdkInstance] = useState(null);

  useEffect(() => {
  if (window.paypal) {
    return;
  }

  if (document.querySelector("#paypal-v6-sdk")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "paypal-v6-sdk";
  script.src = "https://www.paypal.com/web-sdk/v6/core";
  script.async = true;

  script.onload = initialize;

  document.body.appendChild(script);
}, []);


  async function loadSDK() {
    if (window.paypal) {
      initialize();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.paypal.com/web-sdk/v6/core";
    script.async = true;

    script.onload = initialize;
    document.body.appendChild(script);
  }

  async function initialize() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/payments/client-token"
      );

      const instance = await window.paypal.createInstance({
        clientToken: data.clientToken,
      });

      const cardFields = await instance.createCardFields({
        styles: {
          input: {
            "font-size": "16px",
          },
        },
      });

      await cardFields.render(cardContainerRef.current);

      setSdkInstance({ instance, cardFields });
    } catch (err) {
      console.error("Erro ao iniciar SDK:", err);
    }
  }

  async function handlePayment() {
    try {
      const { data: order } = await axios.post(
        "http://localhost:5000/api/payments/card/create",
        { amount }
      );

      const result = await sdkInstance.cardFields.submit({
        orderId: order.id,
      });

      await axios.post("http://localhost:5000/api/payments/capture", {
        orderID: order.id,
      });

      alert("Pagamento aprovado!");
    } catch (error) {
      console.error("Erro no pagamento:", error);
      alert("Erro ao processar pagamento");
    }
  }

  return (
    <div>
      <div ref={cardContainerRef}></div>
      <button onClick={handlePayment}>
        Pagar R$ {amount}
      </button>
    </div>
  );
}
