//Nos servira para validar los token
const { request, response } = require("express");
const Usuario = require("../models/usuariosModel");
const jwt = require("jsonwebtoken");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token"); //Los token van generalmente en Headers
  //Preguntar si me mandaron el token
  if (!token) {
    return res.status(401).json({
      //status 401 = No autorizado
      msg: "No hay token en la peticion",
    });
  }
  try {
    //verificar el token y obtener el id del usuario uid
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //verify traera lo que esta en el payload y la unica manera de traerlo es con la llave secreta.
    //console.log(payload);

    //obtener los datos del usuario autenticado y para eso importamos el schema usuario
    const usuario = await Usuario.findById(uid);

    //validar si el usuario existe xq puede pasar de que eliminen al usuario pero su token no expiro
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - Usuario no existe",
      });
    }

    //Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - Usuario inactivo",
      });
    }
    req.usuario = usuario; //me creo una variable desde la req y podre acceder desde el controlador

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
