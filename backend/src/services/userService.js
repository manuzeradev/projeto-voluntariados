const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

class UserService {

    static async registrarUser(user) {
        const { email, password, role } = user;
    
        const existing = await userModel.findByEmail(email);
        if (existing) {
            throw new Error('Usuário já existe');
        }
       
        const hashed = await bcrypt.hash(password, 10);
       
        user.password = hashed;
    
        const id = await userModel.criar(user);
        
        return { message: 'Usuário registrado com sucesso', id };
    }
   
    static async loginUser({ email, password }) {
       
        const user = await userModel.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
      
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Senha inválida');
        }
       
        const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        return { token, user: { email: user.email, role: user.role } };
    }
}
module.exports = UserService;