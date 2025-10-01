class ProtectedController {

    static adminOnly(req, res) {
        try {
            
            return res.status(200).json({
                message: `Bem-vindo à Área Admin,
                    ${req.user.email}`
            });
        } catch (error) {
           
            return res.status(500).json({
                message: 'Erro ao acessar a Área Admin',
                error: error.message
            });
        }
    }
}

module.exports = ProtectedController;