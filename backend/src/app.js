const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes')
const eventoRoutes = require('./routes/evento.routes')
const protectedRoutes = require('./routes/protected.routes');
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Projeto Voluntariados',
      version: '1.0.0',
      description: 'API para gerenciamento de voluntários',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/evento', eventoRoutes)
app.use('/users', usersRoutes)

module.exports = app;