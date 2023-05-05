const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  //Recibe algo que manda el cliente y lo que le respondera el servidor
  const { apiKey, limit } = req.query; //parametros despues del signo de pregunta en la consulta
  res.json({
    mensaje: "Get Usuarios del controlador",
    apiKey,
    limit,
  });
};

const usuariosPost = (req = request, res = response) => {
  //recibir el cuerpo de la petición
  //const body = req.body; //req es lo que viene del front (recibiendo)
  const { nombre, correo } = req.body;
  res.json({
    //Respuesta del servidor al cliente. json xq queremos que sea en formato json, sino le pondriamos poner send
    mensaje: "Post Usuarios",
    nombre,
    correo,
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
