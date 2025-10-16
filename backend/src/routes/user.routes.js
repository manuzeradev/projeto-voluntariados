const express = require('express')
const UserController = require('../controllers/user.controller')
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middlewares')
const router = express.Router()

/**
 * @openapi
 * components:
 * schemas:
 * User:
 * type: object
 * properties:
 * id:
 * type: integer
 * description: O ID único do usuário.
 * example: 1
 * name:
 * type: string
 * description: O nome completo do usuário.
 * example: "Jane Doe"
 * email:
 * type: string
 * format: email
 * description: O endereço de e-mail do usuário.
 * example: "jane.doe@example.com"
 * role:
 * type: string
 * description: O papel do usuário no sistema (ex: 'admin', 'user').
 * example: "user"
 * NewUser:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * - role
 * properties:
 * name:
 * type: string
 * description: O nome completo do usuário.
 * example: "John Smith"
 * email:
 * type: string
 * format: email
 * description: O endereço de e-mail do usuário.
 * example: "john.smith@example.com"
 * password:
 * type: string
 * format: password
 * description: A senha para a conta do usuário.
 * example: "strongpassword123"
 * role:
 * type: string
 * description: O papel a ser atribuído ao usuário.
 * example: "user"
 */

/**
 * @openapi
 * /users:
 * get:
 * summary: Lista todos os usuários
 * tags: [Usuários]
 * description: Retorna uma lista com todos os usuários cadastrados no sistema.
 * responses:
 * '200':
 * description: Uma lista de usuários.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 */
router.get('/', UserController.users)

/**
 * @openapi
 * /users:
 * post:
 * summary: Cria um novo usuário
 * tags: [Usuários]
 * description: Adiciona um novo usuário ao sistema. Rota protegida, acessível apenas para administradores.
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewUser'
 * responses:
 * '201':
 * description: Usuário criado com sucesso.
 * '400':
 * description: Dados inválidos.
 * '401':
 * description: Não autorizado (token inválido ou ausente).
 * '403':
 * description: Acesso negado (usuário não é admin).
 */

router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  UserController.criarUser,
)

/**
 * @openapi
 * /users/{id}:
 * delete:
 * summary: Deleta um usuário
 * tags: [Usuários]
 * description: Remove um usuário do sistema pelo seu ID. Rota protegida, acessível apenas para administradores.
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: O ID do usuário a ser deletado.
 * responses:
 * '204':
 * description: Usuário deletado com sucesso (sem conteúdo).
 * '401':
 * description: Não autorizado.
 * '403':
 * description: Acesso negado.
 * '404':
 * description: Usuário não encontrado.
 */

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.deletarUser,
)

/**
 * @openapi
 * /users/{id}:
 * put:
 * summary: Atualiza um usuário existente
 * tags: [Usuários]
 * description: Modifica os dados de um usuário existente. Rota protegida, acessível apenas para administradores.
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: O ID do usuário a ser atualizado.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewUser'
 * responses:
 * '200':
 * description: Usuário atualizado com sucesso.
 * '400':
 * description: Dados inválidos.
 * '401':
 * description: Não autorizado.
 * '403':
 * description: Acesso negado.
 * '404':
 * description: Usuário não encontrado.
 */

router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.atualizarUser,
)

module.exports = router