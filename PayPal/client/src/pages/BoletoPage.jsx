import { useState } from "react";
import axios from "axios";

export default function BoletoPage() {

  const [boletoLink, setBoletoLink] = useState(null);

  const gerarBoleto = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/payments/boleto/create",
      { amount: "100.00" }
    );

    setBoletoLink(response.data.links[1].href);
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-gray-800">
        Pagamento via Boleto
      </h2>

      <button
        onClick={gerarBoleto}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Gerar Boleto
      </button>

      {boletoLink && (
        <div className="mt-4">
          <a
            href={boletoLink}
            target="_blank"
            className="text-blue-600 underline"
          >
            Visualizar Boleto
          </a>
        </div>
      )}

    </div>
  );
}
