const UserService = require('../services/userService')

class UserController {

  static async criarUser(req, res) {
    try {
      const result = await UserService.criarUser(req.body)
      return res.status(200).json(result)
    } catch (error) {
      const status = 404
      return res.status(status).json({ message: error.message })
    }
  }

  static async users(req, res) {
    try {
      const result = await UserService.listar()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message }).id
    }
  }

  static async deletarUser(req, res) {
    try {
      const result = await UserService.deletarUser(req.params.id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async atualizarUser(req, res) {
    try {
      const { id } = req.params
      const { email, password, role } = req.body
      const result = await UsersService.atualizarUser(id, email, password, role)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}

module.exports = UserController