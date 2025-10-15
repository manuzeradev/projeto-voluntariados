const express = require('express')
const EventoController = require('../controllers/evento.controller')
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware')
const router = express.Router()
router.get('/', EventoController.eventos)
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  EventoController.criarEvento,
)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  EventoController.deletarEvento, 
)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  EventoController.atualizarEvento,
)
router.get('/inscritos', EventoController.getInscritos)
router.post('/:idEvent/user/:idUser', EventoController.inscritoEvento)
router.delete('/:idEvent/user/:idUser', EventoController.desinscreverEvento)

module.exports = router
