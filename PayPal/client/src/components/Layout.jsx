import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            PaySystem
          </h1>

          <div className="flex gap-6">
            <Link className="hover:text-blue-600" to="/">
              Home
            </Link>
            <Link className="hover:text-blue-600" to="/card">
              Cartão
            </Link>
            <Link className="hover:text-blue-600" to="/boleto">
              Boleto
            </Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        {children}
      </div>

    </div>
  );
}
