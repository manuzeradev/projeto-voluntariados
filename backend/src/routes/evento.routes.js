const express = require('express')
const EventoController = require('../controllers/evento.controller')
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middlewares.js')

const router = express.Router()

/**
 * @openapi
 * components:
 * schemas:
 * Evento:
 * type: object
 * properties:
 * id:
 * type: integer
 * description: O ID do evento.
 * example: 1
 * name:
 * type: string
 * description: O nome do evento.
 * example: "Campanha de Doação de Sangue"
 * description:
 * type: string
 * description: A descrição detalhada do evento.
 * example: "Participe da nossa campanha para ajudar a salvar vidas."
 * date:
 * type: string
 * format: date-time
 * description: A data e hora do evento.
 * example: "2025-10-28T10:00:00Z"
 * NewEvento:
 * type: object
 * properties:
 * name:
 * type: string
 * description: O nome do evento.
 * example: "Mutirão de Limpeza"
 * description:
 * type: string
 * description: A descrição detalhada do evento.
 * example: "Vamos limpar a praça central da cidade."
 * date:
 * type: string
 * format: date-time
 * description: A data e hora do evento.
 * example: "2025-11-15T09:00:00Z"
 * Inscricao:
 * type: object
 * properties:
 * id:
 * type: integer
 * example: 101
 * idUser:
 * type: integer
 * example: 15
 * idEvent:
 * type: integer
 * example: 2
 * inscriptionDate:
 * type: string
 * format: date-time
 * example: "2025-10-15T14:30:00Z"
 */

/**
 * @openapi
 * /eventos:
 * get:
 * summary: Lista todos os eventos disponíveis
 * tags: [Eventos]
 * description: Retorna uma lista com todos os eventos de voluntariado cadastrados.
 * responses:
 * '200':
 * description: Uma lista de eventos.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Evento'
 */

router.get('/', EventoController.eventos)

/**
 * @openapi
 * /eventos:
 * post:
 * summary: Cria um novo evento
 * tags: [Eventos]
 * description: Adiciona um novo evento ao sistema. Rota protegida, acessível apenas para administradores.
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewEvento'
 * responses:
 * '201':
 * description: Evento criado com sucesso.
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
  EventoController.criarEvento,
)

/**
 * @openapi
 * /eventos/{id}:
 * delete:
 * summary: Deleta um evento
 * tags: [Eventos]
 * description: Remove um evento do sistema pelo seu ID. Rota protegida, acessível apenas para administradores.
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: O ID do evento a ser deletado.
 * responses:
 * '204':
 * description: Evento deletado com sucesso (sem conteúdo).
 * '401':
 * description: Não autorizado.
 * '403':
 * description: Acesso negado.
 * '404':
 * description: Evento não encontrado.
 */

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  EventoController.deletarEvento,
)

/**
 * @openapi
 * /eventos/{id}:
 * put:
 * summary: Atualiza um evento existente
 * tags: [Eventos]
 * description: Modifica os dados de um evento existente. Rota protegida, acessível apenas para administradores.
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: O ID do evento a ser atualizado.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewEvento'
 * responses:
 * '200':
 * description: Evento atualizado com sucesso.
 * '400':
 * description: Dados inválidos.
 * '401':
 * description: Não autorizado.
 * '403':
 * description: Acesso negado.
 * '404':
 * description: Evento não encontrado.
 */

router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  EventoController.atualizarEvento,
)

/**
 * @openapi
 * /eventos/inscritos:
 * get:
 * summary: Lista todas as inscrições
 * tags: [Inscrições]
 * description: Retorna uma lista de todas as inscrições de usuários em eventos.
 * responses:
 * '200':
 * description: Lista de inscrições.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Inscricao'
 */

router.get('/inscritos', EventoController.getInscritos)

/**
 * @openapi
 * /eventos/{idEvent}/user/{idUser}:
 * post:
 * summary: Inscreve um usuário em um evento
 * tags: [Inscrições]
 * description: Cria uma nova inscrição vinculando um usuário a um evento específico.
 * parameters:
 * - in: path
 * name: idEvent
 * required: true
 * schema:
 * type: integer
 * description: O ID do evento.
 * - in: path
 * name: idUser
 * required: true
 * schema:
 * type: integer
 * description: O ID do usuário.
 * responses:
 * '201':
 * description: Inscrição realizada com sucesso.
 * '404':
 * description: Usuário ou evento não encontrado.
 * '409':
 * description: Conflito, o usuário já está inscrito neste evento.
 */

router.post('/:idEvent/user/:idUser', EventoController.inscritoEvento)

/**
 * @openapi
 * /eventos/{idEvent}/user/{idUser}:
 * delete:
 * summary: Desinscreve um usuário de um evento
 * tags: [Inscrições]
 * description: Remove a inscrição de um usuário de um evento.
 * parameters:
 * - in: path
 * name: idEvent
 * required: true
 * schema:
 * type: integer
 * description: O ID do evento.
 * - in: path
 * name: idUser
 * required: true
 * schema:
 * type: integer
 * description: O ID do usuário.
 * responses:
 * '204':
 * description: Inscrição removida com sucesso.
 * '404':
 * description: Inscrição, usuário ou evento não encontrado.
 */

router.delete('/:idEvent/user/:idUser', EventoController.desinscreverEvento)

module.exports = router