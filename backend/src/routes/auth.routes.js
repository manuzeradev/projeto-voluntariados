const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();
//DOCUMENTAÇÃO PENDENTE
router.post('/login', AuthController.login);

module.exports = router;
