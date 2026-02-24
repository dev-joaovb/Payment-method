import { useEffect, useState } from "react";
import axios from "axios";

export default function CardFieldsForm({ amount }) {

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {

    if (!window.paypal || !window.paypal.CardFields) {
      console.error("PayPal CardFields não carregado.");
      return;
    }

    const cardFields = window.paypal.CardFields({

      /**
       * Cria ordem chamando backend
       */
      createOrder: async () => {
        const response = await axios.post(
          "http://localhost:5000/api/payments/card/create",
          { amount }
        );

        return response.data.id;
      },

      /**
       * Quando pagamento é aprovado
       */
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

      /**
       * Tratamento de erro
       */
      onError: (err) => {
        console.error("Erro no pagamento:", err);
        setStatus("error");
      }

    });

    if (cardFields.isEligible()) {

      cardFields.NumberField().render("#card-number");
      cardFields.ExpiryField().render("#card-expiry");
      cardFields.CVVField().render("#card-cvv");
      cardFields.NameField().render("#card-name");

      cardFields.render("#card-submit-container");
    }

  }, [amount]);

  return (
    <div className="space-y-4">

      {/* Campo Número */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número do Cartão
        </label>
        <div
          id="card-number"
          className="border rounded-lg p-3 bg-white"
        ></div>
      </div>

      {/* Validade + CVV */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Validade
          </label>
          <div
            id="card-expiry"
            className="border rounded-lg p-3 bg-white"
          ></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <div
            id="card-cvv"
            className="border rounded-lg p-3 bg-white"
          ></div>
        </div>

      </div>

      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome no Cartão
        </label>
        <div
          id="card-name"
          className="border rounded-lg p-3 bg-white"
        ></div>
      </div>

      {/* Botão PayPal Renderizado */}
      <div id="card-submit-container" className="mt-4"></div>

      {/* Status */}
      {loading && (
        <div className="text-blue-600 text-sm">
          Processando pagamento...
        </div>
      )}

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
