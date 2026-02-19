// Responsável por comunicar com nosso backend Node

import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

/**
 * Cria ordem no backend
 */
export async function createOrder(amount) {
  const response = await axios.post(`${API_URL}/create-order`, {
    amount,
  });

  return response.data.id; // retorna orderID
}

/**
 * Captura pagamento após aprovação
 */
export async function captureOrder(orderID) {
  const response = await axios.post(`${API_URL}/capture-order`, {
    orderID,
  });

  return response.data;
}
