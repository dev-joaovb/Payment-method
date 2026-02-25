const axios = require("axios");

async function generateAccessToken() {
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
  });

  return response.data.access_token;
}

async function generateClientToken() {
  const accessToken = await generateAccessToken();

  const response = await axios.post(
    `${process.env.PAYPAL_BASE_URL}/v1/identity/generate-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.client_token;
}

module.exports = { generateAccessToken, generateClientToken };
