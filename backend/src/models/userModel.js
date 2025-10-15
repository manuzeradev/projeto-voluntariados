const db = require('../config/database');

class userModel {


    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }


    static async criarUser(email, password, role) {
        const [results] = await db.query(
            `INSERT INTO users VALUES (NULL, ?, ?, ?, NULL)`,
            [email, password, role],
        )
        return results
    }

    static async listar() {
        const [rows] = await db.query('SELECT * FROM users')
        return rows
    }

    static async atualizarUser(id, email, password, role) {
        const [results] = await db.query(
            'UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?',
            [email, password, role, id],
        )
        return results
    }

    static async deletarUser(id) {
        const [results] = await db.query('DELETE FROM users WHERE id = ?', [id])
        return results
    }
}
module.exports = userModel;
