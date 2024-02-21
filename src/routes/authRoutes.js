const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validation');

router.post('/', [
    check("email", "El email es obligatorio").trim().notEmpty().isEmail(),
    check("password", "La contraseña es obligatoria").trim().notEmpty(),
    validateFields
], authController.login);

router.post('/register', [
    check("username", "El nombre es obligatorio").trim().notEmpty(),
    check("userlastName", "El apellido es obligatorio").trim().notEmpty(),
    check("email", "El email es obligatorio").trim().notEmpty().isEmail(),
    check("pass", "La contraseña es obligatoria").trim().notEmpty().isLength({ min: 6 }),
    validateFields
],authController.register)


module.exports = router;