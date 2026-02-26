const { generateClientToken } = require("../config/paypalClient");

async function getClientToken(req, res) {
  try {
    const clientToken = await generateClientToken();

    res.json({
      clientToken,   // SDK v6 espera isso
    });

  } catch (error) {
    console.error("Erro no endpoint client-token:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao gerar client token" });
  }
}

module.exports = { getClientToken };
