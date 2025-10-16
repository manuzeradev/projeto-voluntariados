const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes')
const eventoRoutes = require('./routes/evento.routes')
const protectedRoutes = require('./routes/protected.routes');
const userRoutes = require('./routes/user.routes')
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({});
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/evento', eventoRoutes)
app.use('/users', userRoutes)

module.exports = app;