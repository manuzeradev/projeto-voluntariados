const EventoModel = require('../models/eventoModel')

class EventoService {
  
  static async listar() {
    const listar = await EventoModel.listar()
    if (listar.length == 0) {
      throw new Error('Nenhum evento encontrado')
    }

    return { listar}
  }

  static async criarEvento(form) {
    if (form.evento == null || form.data == null) {
      throw new Error('Dados incorretos, tente novamente!')
    }

    const dataFornecida = new Date(form.data)
    const dataHoje = new Date()
    dataHoje.setHours(0, 0, 0, 0)
    if (dataFornecida <= dataHoje) {
      throw new Error('Data inválida')
    }

    const resultado = await EventoModel.criarEvento(form.evento, form.data)
    if (result.affectedRows == 0) {
      throw new Error('Erro ao adicionar evento!')
    }

    return { resultado }
  }

  static async deletarEvento(id) {
    try {
      const resultado = await EventoModel.deletarEvento(id)

      if (result.affectedRows === 0) {
        throw new Error('Evento não encontrado')
      }

      return resultado
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao excluir o evento')
    }
  }


  static async atualizarEvento(id, evento, data) {
    try {
      const resultado = await EventoModel.atualizarEvento(id, evento, data)

      if (result.affectedRows === 0) {
        throw new Error('Evento não encontrado')
      }

      return resultado
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao alterar o evento')
    }
  }

  static async getInscritos() {
    try {
      return EventoModel.getInscritos()
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao listar inscrições')
    }
  }

  static async inscreverEvento(idEvent, idUser) {
    try {
      const resultado = await EventoModel.inscreverEvento(idEvent, idUser)

      if (result.affectedRows === 0) {
        throw new Error('Evento não encontrado')
      }

      return resultado
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao inscrever no evento')
    }
  }

  static async desinscreverEvento(idEvent, idUser) {
    try {
      const resultado = await EventoModel.desinscreverEvento(idEvent, idUser)

      if (result.affectedRows === 0) {
        throw new Error('Evento não encontrado')
      }

      return resultado
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao desinscrever no evento')
    }
  }
}
module.exports = EventoService