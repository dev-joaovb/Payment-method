import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function CardFieldsForm({ amount }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const cardFieldsRef = useRef(null);

  useEffect(() => {
    const loadPayPalScript = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/payments/client-token"
      );

      return new Promise((resolve) => {
        if (window.paypal && window.paypal.CardFields) {
          resolve();
          return;
        }

        const script = document.createElement("script");

        script.src = `https://www.sandbox.paypal.com/web-sdk/v6/core?client-id=${
          import.meta.env.VITE_PAYPAL_CLIENT_ID
        }&currency=BRL&intent=capture&components=card-fields&data-client-token=${
          data.clientToken
        }`;

        script.async = true;
        script.onload = () => resolve();

        document.body.appendChild(script);
      });
    };

    const initializeCardFields = async () => {
      await loadPayPalScript();

      if (!window.paypal || !window.paypal.CardFields) {
        console.error("CardFields ainda não disponível.");
        return;
      }

      const cardFields = window.paypal.CardFields({
        createOrder: async () => {
          const response = await axios.post(
            "http://localhost:5000/api/payments/card/create",
            { amount }
          );
          return response.data.id;
        },

        onApprove: async (data) => {
          setLoading(true);

          try {
            const capture = await axios.post(
              "http://localhost:5000/api/payments/capture",
              { orderID: data.orderID }
            );

            setStatus("success");
            console.log("Pagamento aprovado:", capture.data);
          } catch (error) {
            setStatus("error");
          }

          setLoading(false);
        },

        onError: (err) => {
          console.error("Erro no pagamento:", err);
          setStatus("error");
        },
      });

      if (cardFields.isEligible()) {
        cardFields.NumberField().render("#card-number");
        cardFields.ExpiryField().render("#card-expiry");
        cardFields.CVVField().render("#card-cvv");
        cardFields.NameField().render("#card-name");

        cardFieldsRef.current = cardFields;
      }
      
    };

    

    initializeCardFields();
  }, [amount]);

  const handleSubmit = async () => {
    if (!cardFieldsRef.current) return;

    setLoading(true);
    setStatus(null);

    try {
      await cardFieldsRef.current.submit();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Número do Cartão
        </label>
        <div id="card-number" className="border rounded-lg p-3 bg-white"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Validade
          </label>
          <div id="card-expiry" className="border rounded-lg p-3 bg-white"></div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            CVV
          </label>
          <div id="card-cvv" className="border rounded-lg p-3 bg-white"></div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Nome no Cartão
        </label>
        <div id="card-name" className="border rounded-lg p-3 bg-white"></div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processando..." : `Pagar R$ ${amount}`}
      </button>

      {status === "success" && (
        <div className="text-green-600 font-semibold">
          ✅ Pagamento aprovado com sucesso!
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600 font-semibold">
          ❌ Erro ao processar pagamento.
        </div>
      )}
    </div>
  );
}
