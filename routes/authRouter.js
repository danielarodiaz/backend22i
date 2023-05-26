const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { login } = require("../controllers/authController");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  login
); //ruta, controlador

module.exports = router;
