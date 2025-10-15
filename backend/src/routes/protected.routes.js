const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');
const ProtectedController = require('../controllers/protected.controller');
const router = express.Router();

/**
 * @openapi
 * /dashboard/admin:
 * get:
 * summary: Rota de acesso exclusivo para administradores
 * tags: [Dashboard]
 * description: Acessa um recurso protegido que só pode ser visualizado por usuários com o papel (role) de 'admin'. Requer um token JWT válido no cabeçalho de autorização (Authorization: Bearer <token>).
 * security:
 * - bearerAuth: []
 * responses:
 * '200':
 * description: Acesso concedido. Conteúdo exclusivo para administradores.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "Bem-vindo, admin! Você tem acesso a este conteúdo."
 * '401':
 * description: Não autorizado. O token JWT está ausente ou é inválido.
 * '403':
 * description: Acesso Proibido. O usuário autenticado não tem permissão de administrador.
 * '500':
 * description: Erro interno do servidor.
 */

router.get('/admin',
    authenticateToken,
    authorizeRole('admin'),
    ProtectedController.adminOnly
);

module.exports = router;
