const axios = require("axios");
const { generateAccessToken } = require("../config/paypalClient");

async function createCardOrder(req, res) {
  try {
    const { amount } = req.body;

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
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao criar ordem cartão" });
  }
}

module.exports = { createCardOrder };
