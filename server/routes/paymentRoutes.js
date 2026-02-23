const express = require("express");
const { createCardOrder } = require("../controllers/cardController");
const { createBoletoOrder } = require("../controllers/boletoController");

const router = express.Router();

// Cartão
router.post("/card/create", createCardOrder);

// Boleto
router.post("/boleto/create", createBoletoOrder);

module.exports = router;
