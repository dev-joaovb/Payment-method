// paypalClient.js

const axios = require("axios");
require("dotenv").config();

/**
 * Função responsável por gerar o Access Token OAuth2
 * Toda comunicação com a API do PayPal exige esse token.
 */
async function generateAccessToken() {
  try {
    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      data: "grant_type=client_credentials",
    });

    return response.data.access_token;

  } catch (error) {
    console.error("Erro ao gerar Access Token:", error.response?.data || error.message);
    throw new Error("Falha na autenticação PayPal");
  }
}

module.exports = {
  generateAccessToken,
};
