const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

/**
 * @openapi
 * /auth/login:
 * post:
 * summary: Autentica um usuário e retorna um token JWT
 * tags: [Autenticação]
 * description: Realiza a autenticação de um usuário com base em email e senha. Se as credenciais forem válidas, retorna um token JWT para ser usado em rotas protegidas.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * description: O email do usuário para login.
 * example: "admin@ifrs.edu.br"
 * password:
 * type: string
 * description: A senha do usuário.
 * example: "123456"
 * responses:
 * '200':
 * description: Autenticação bem-sucedida.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * description: Token JWT para autorização.
 * example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlmcnMuZWR1LmJyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0NjM2NjU3fQ.abcdef123456"
 * '401':
 * description: Não autorizado. Credenciais inválidas.
 * '500':
 * description: Erro interno do servidor.
 */
router.post('/login', AuthController.login);

module.exports = router;