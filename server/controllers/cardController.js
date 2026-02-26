const axios = require("axios");
const { generateAccessToken } = require("../config/paypalClient");

async function createCardOrder(req, res) {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount é obrigatório" });
    }

    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "BRL",
              value: amount,
            },
          },
        ],
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
    console.error("Erro ao criar ordem cartão:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao criar ordem cartão" });
  }
}

module.exports = { createCardOrder };
