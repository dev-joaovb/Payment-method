// cardController.js
const axios = require("axios");
const { generateAccessToken } = require("../config/paypalClient");

async function createCardOrder(req, res) {
  try {
    const { productId } = req.body; // Receba o ID, não o preço

    // SIMULAÇÃO: Busque o valor real no seu banco de dados
    const products = { "1": "150.00", "2": "50.00" };
    const valorReal = products[productId] || "10.00"; 

    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "BRL",
              value: valorReal,
            },
          },
        ],
        // Opcional: Adicionar payment_source para facilitar o processamento de cartões
        payment_source: {
          card: {}
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    const details = error.response?.data || error.message;
    console.error("Erro ao criar ordem:", details);
    res.status(500).json({ error: "Erro ao criar ordem", details });
  }
}

module.exports = { createCardOrder };