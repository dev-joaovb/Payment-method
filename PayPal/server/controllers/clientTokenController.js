const { generateSdkClientToken } = require("../config/paypalClient");

async function generateClientToken(req, res) {
  try {
    const clientToken = await generateSdkClientToken();
    res.json({ clientToken });
  } catch (error) {
    console.error("Erro ao gerar client token:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao gerar client token" });
  }
}

module.exports = { generateClientToken };
