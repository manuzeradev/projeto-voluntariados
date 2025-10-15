const db = require('../config/database');

class userModel {

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
}

module.exports = userModel;
