import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center space-y-6">

      <h2 className="text-3xl font-bold text-gray-800">
        Escolha o Método de Pagamento
      </h2>

      <div className="flex justify-center gap-6">

        <Link to="/card">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Débito / Crédito
          </button>
        </Link>

        <Link to="/boleto">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            Boleto Bancário
          </button>
        </Link>

      </div>

    </div>
  );
}
