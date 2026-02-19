import CardCheckout from "./components/CardCheckout";

function App() {

  const amount = "100.00";

  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout Profissional 💳</h1>
      <h2>Valor: R$ {amount}</h2>

      <CardCheckout amount={amount} />
    </div>
  );
}

export default App;
