import CardFieldsForm from "../components/CardFieldsForm";

export default function CardPage() {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-gray-800">
        Pagamento com Cartão
      </h2>

      <div className="border p-6 rounded-lg bg-gray-50">
        <CardFieldsForm amount="100.00" />
      </div>

    </div>
  );
}
