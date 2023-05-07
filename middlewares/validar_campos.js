const { validationResult } = require("express-validator");
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next(); //lo que hace es que si no hay errores, continua, osea lo guarda en la bd
};

module.exports = { validarCampos };
