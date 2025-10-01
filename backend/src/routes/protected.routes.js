const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');
const ProtectedController = require('../controllers/protected.controller');
const router = express.Router();
//DOCUMENTAÇÃO PENDENTE
router.get('/admin', authenticateToken, authorizeRole('admin'),
    ProtectedController.adminOnly);

module.exports = router;
