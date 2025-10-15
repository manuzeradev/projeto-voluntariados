const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

class UserService {

  /**
  Valida o nome do usuário.
  string email - Nome informado
  string password - Senha informado
  retorna boolean true se válido
  dispara Error Se a senha for inválida ou o usuário não for encontrado
   */

    static async loginUser({ email, password }) {
    const user = await userModel.findByEmail(email)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Senha inválida')
    }
    const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )
    return { token, user: { email: user.email, role: user.role, id: user.id } }
  }

  /**
  Retorna array de usuários.
  Dispara Error Se nenhum usuário encontrado
   */
  
  static async listar() {
    const listar = await userModel.listar()
    if (listar.length == 0) {
      throw new Error('Nenhum usuário encontrado')
    }

    return {listar}
  }

  /**
  Cria novo usuário.
   */

  static async criarUser(form) {
    if (form.email == null || form.password == null || form.role == null) {
      throw new Error('Dados incorretos, verifique e tente novamente!')
    }
    const hashed = await bcrypt.hash(form.password, 10)
    form.password = hashed
    const resultado = await userModel.criarUser(
      form.email,
      form.password,
      form.role,
    )
    if (result.affectedRows == 0) {
      throw new Error('Erro ao adicionar usuário!')
    }

    return {resultado}
  }

  /**
  Atualiza usuário.
   */

  static async atualizarUser(id, email, password, role) {
    try {
      const hashed = await bcrypt.hash(password, 10)
      password = hashed
      const resultado = await userModel.atualizarUser(id, email, password, role)

      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado')
      }

      return resultado
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao alterar usuário')
    }
  }

  /**
  Deleta usuário.
   */

  static async deletarUser(id) {
    try {
      const resultado = await userModel.deletarUser(id)

      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado')
      }

      return resultado
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao excluir o usuário')
    }
  }
}

module.exports = UserService;