import { useEffect, useRef } from "react";

export default function PayPalCheckout() {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      renderButtons();
      return;
    }

    console.log("CLIENT ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=BRL`;
    script.async = true;

    script.onload = () => {
      renderButtons();
    };

    document.body.appendChild(script);

    function renderButtons() {
      window.paypal.Buttons({ 
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00",
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Pagamento aprovado por " + details.payer.name.given_name);
          });
        },
      }).render(paypalRef.current);
    }
  }, []);

  return <div ref={paypalRef}></div>;
}
