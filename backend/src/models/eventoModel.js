const db = require('../config/database')

class EventoModel {
  static async listar() {
    const [rows] = await db.query('SELECT * FROM events')
    return rows
  }

  static async criarEvento(evento, data) {
    const [results] = await db.query(`INSERT INTO events VALUES (NULL, ?, ?)`, [
      evento,
      data,
    ])
    return results
  }

  static async deletarEvento(id) {
    const [results] = await db.query('DELETE FROM events WHERE id = ?', [id])
    return results
  }

  static async atualizarEvento(id, evento, data) {
    const [results] = await db.query(
      'UPDATE events SET nome = ?, data = ? WHERE id = ?',
      [evento, data, id],
    )
    return results
  }

  static async inscreverEvento(idEvento, isUser) {
    const [results] = await db.query(
      'INSERT INTO subsevents (id, idEvent, idUser) VALUES (NULL, ?, ?)',
      [idEvento, isUser],
    )
    return results
  }

  static async desinscreverEvento(idEvento, isUser) {
    const [results] = await db.query(
      'DELETE FROM subsevents WHERE idEvent = ? AND idUser = ?',
      [idEvento, isUser],
    )
    return results
  }

  static async getInscritos() {
    const [results] = await db.query('SELECT * FROM subsevents')
    return results
  }
}

module.exports = EventoModel