const express = require("express");
const { createCardOrder } = require("../controllers/cardController");
const { createBoletoOrder } = require("../controllers/boletoController");
const { captureOrder } = require("../controllers/captureController");
const { getClientToken } = require("../controllers/clientTokenController");

const router = express.Router();

// Cartão
router.post("/card/create", createCardOrder);

// Boleto
router.post("/boleto/create", createBoletoOrder);

// Captura (usado principalmente para cartão)
router.post("/capture", captureOrder);

// Client Token (usado para inicializar os campos de cartão no frontend)
router.get("/client-token", getClientToken);


module.exports = router;
