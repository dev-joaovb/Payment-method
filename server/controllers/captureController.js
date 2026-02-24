const axios = require("axios");
const { generateAccessToken } = require("../config/paypalClient");

/**
 * Captura pagamento após aprovação
 */
async function captureOrder(req, res) {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "orderID é obrigatório" });
    }

    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("Erro ao capturar:", error.response?.data);
    res.status(500).json({ error: "Erro ao capturar pagamento" });
  }
}

module.exports = { captureOrder };
