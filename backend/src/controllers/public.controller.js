const EventoService = require('../services/eventoService')

class PublicController {

  static async eventos(req, res) {
    try {
      const result = await EventoService.listar()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}

module.exports = PublicController
