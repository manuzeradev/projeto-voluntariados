const EventoService = require('../services/EventoService')

class EventoController {
  
  static async criarEvento(req, res) {
    try {
      const resultado = await EventoService.criarEvento(req.body)
      return res.status(200).json(result)
    } catch (error) {
      const status = 404
      return res.status(status).json({ message: error.message })
    }
  }

  static async eventos(req, res) {
    try {
      const resultado = await EventoService.listar()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message }).id
    }
  }

  static async deletarEvento(req, res) {
    try {
      const resultado = await EventoService.deletarEvento(req.params.id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async atualizarEvento(req, res) {
    try {
      const { id } = req.params
      const { evento, data } = req.body
      const resultado = await EventoService.atualizarEvento(id, evento, data)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async getInscritos(req, res) {
    try {
      const resultado = await EventoService.getInscritos()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async inscritoEvento(req, res) {
    try {
      const { idEvent, idUser } = req.params
      const resultado = await EventoService.inscritoEvento(idEvent, idUser)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async desinscreverEvento(req, res) {
    try {
      const { idEvent, idUser } = req.params
      const resultado = await EventoService.desinscreverEvento(idEvent, idUser)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}

module.exports = EventoController
