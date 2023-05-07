const { response, request } = require("express");
//const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //Importar libreria para encriptar contraseña
const Usuario = require("../models/usuariosModel"); //import el modelo

const usuariosGet = (req = request, res = response) => {
  //Recibe algo que manda el cliente y lo que le respondera el servidor
  const { apiKey, limit } = req.query; //parametros despues del signo de pregunta en la consulta
  res.json({
    mensaje: "Get Usuarios del controlador",
    apiKey,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  //validar los errores con validationResult importada
  // const errors = validationResult(req);
  // //si errors no esta vacio, entonces hay errores...
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // } //Esta funcion se va para validar_campos de middlewares para que sea mas optim y se ejecuta despues de todos los check en routes

  //es async xq usamos await xq esperamos respuesta para verificar, guardar
  //recibir el cuerpo de la petición
  //const body = req.body; //req es lo que viene del front (recibiendo)
  const datos = req.body;
  //Desustructuramos solo la info que necesito por si en la peticion me mandan datos que no estan en mi schema
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol }); //Intancia usuario de Usuario es el model, antes debemos import el modelo
  //Antes de guardar en la bd, hacer:

  //Esto esta en db_validators donde tiene que estar
  // //1.verificar el correo
  // const existeEmail = await Usuario.findOne({ correo }); //findOne es un metodo de los modelos es como el find de los array
  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "El correo ya existe",
  //   });
  // }
  //2.encriptar la contraseña
  const salt = bcrypt.genSaltSync(10); //La cantidad de veces que se encriptara la contra con genSaltSync
  const hash = bcrypt.hashSync(password, salt); //en hash esta la contra encriptada y hashSync es la funcion que encripta la contra
  usuario.password = hash; //Reemplazo el valor original de password por hash
  //3.Guardar en la bd
  await usuario.save();
  res.json({
    //Respuesta del servidor al cliente. json xq queremos que sea en formato json, sino le pondriamos poner send
    // mensaje: "Post Usuarios",
    // nombre,
    // correo,
    // password,
    // rol,
    usuario, //variable usuario para verlo ahora pero en la realidad no le enviamos esto al front
    // nombre,
    // rol,
    mensaje: "Usuario creado correctamente", //Mensaje que recibe el front, lo podemos hacer mediante un alert, swett, etc
  });
};

const usuariosPut = (req = request, res = response) => {
  res.json({
    mensaje: "Put Usuarios",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    mensaje: "Delete Usuarios",
  });
};

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }; //Entre corchetes xq exportaremos muchas funciones
