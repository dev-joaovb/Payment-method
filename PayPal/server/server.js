const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Permite comunicação com frontend React
app.use(cors());

// Permite receber JSON
app.use(express.json());

// Rotas principais
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Servidor PayPal rodando 🚀");
});

// Inicialização
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
