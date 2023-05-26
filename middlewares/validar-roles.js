const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    //si no viene los datos del usuario es xq no valide el token antes
    return res.status(500).json({
      msg: "Se quiere validar el usuario sin tener el token", //esto pasa si antes de colocar el midd esAdminRole no coloco el validarToken que es el mid que tiene el usuario autenticado
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }
  next(); //si es un adminrole
};

module.exports = {
  esAdminRole,
};
