const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuariosModel");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    //1.verificar si el correo existe
    if (!usuario) {
      return res.status(400).json({
        //status 400, error del usuario
        msg: "Correo o password incorrectos",
      });
    }
    //2.verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo o password incorrectos | usuario inactivo",
      });
    }
    //3.verificar el password
    const validPassword = bcrypt.compareSync(password, usuario.password); //password que recibimos, luego el password cifrado
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o password incorrectos",
      });
    }
    //4.generar el token
    const token = await generarJWT(usuario.id); //const usuario viene desde esa const

    res.json({
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      //error 500 es un error del servidor
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
