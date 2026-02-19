const express = require("express");
const axios = require("axios");
const { generateAccessToken } = require("../paypalClient");

const router = express.Router();

/**
 * ROTA: Criar Ordem de Pagamento
 * Essa rota será chamada pelo frontend (React)
 */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const accessToken = await generateAccessToken();

    // Criando ordem no PayPal
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
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
    });

    res.json(response.data);

  } catch (error) {
    console.error("Erro ao criar ordem:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao criar ordem" });
  }
});


/**
 * ROTA: Capturar Pagamento
 * Chamado após aprovação do usuário
 */
router.post("/capture-order", async (req, res) => {
  try {
    const { orderID } = req.body;

    const accessToken = await generateAccessToken();

    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);

  } catch (error) {
    console.error("Erro ao capturar pagamento:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao capturar pagamento" });
  }
});

module.exports = router;
