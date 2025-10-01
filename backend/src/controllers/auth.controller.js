const UserService = require('../services/userService');

class AuthController {

    static async login(req, res) {
        try {
            const result = await UserService.loginUser(req.body);
            return res.status(200).json(result);

        } catch (error) {

            const status =
                error.message === 'Usuário não encontrado' || error.message === 'Senha inválida'
                    ? 401
                    : 500;
            return res.status(status).json({ message: error.message });
        }
    }
}

module.exports = AuthController;