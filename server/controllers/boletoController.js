const axios = require("axios");
const { generateAccessToken } = require("../config/paypalClient");

/**
 * Cria ordem para boleto bancário
 */
async function createBoletoOrder(req, res) {
  try {
    const { amount } = req.body;

    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        payment_source: {
          boletobancario: {
            country_code: "BR"
          }
        },
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
    console.log(error.response?.data);
    res.status(500).json({ error: "Erro ao criar boleto" });
  }
}

module.exports = { createBoletoOrder };
