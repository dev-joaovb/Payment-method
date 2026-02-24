const express = require("express");
const { createCardOrder } = require("../controllers/cardController");
const { createBoletoOrder } = require("../controllers/boletoController");
const { captureOrder } = require("../controllers/captureController");

const router = express.Router();

// Cartão
router.post("/card/create", createCardOrder);

// Boleto
router.post("/boleto/create", createBoletoOrder);

// Captura (usado principalmente para cartão)
router.post("/capture", captureOrder);

module.exports = router;
