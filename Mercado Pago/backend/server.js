import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

// Variáveis do .env
const { PORT, MERCADOPAGO_ACCESS_TOKEN } = process.env;

// Funções e Classes
const app = express();
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
});
const preference = new Preference(client); 

// Middlewares
app.use(cors());

// Criando a rota de criação de sessão de checkout
app.post("/api/create-session", async (req, res) => {
  const body = {
    items: [
      {
        id: "1",
        title: "Formação Full Stack ",
        description:
          "Formação Completa sobre Desenvolvimento Full Stack com JavaScript da Hashtag Treinamentos",
        quantity: 1,
        currency_id: "BRL",
        unit_price: 1497,
      },
    ],
    back_urls: {
      success: "https://localhost:5173/success",
      failure: "https://localhost:5173/cancelado",
      pending: "https://localhost:5173/pendente",
    },
    auto_return: "all",
  };

  try {
    const { init_point } = await preference.create({ body });

    res.json({ init_point });
  } catch (error) {
    res.status(500).json({
      message: "Deu erro na criação da preferência",
      error: error.cause ?? error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
