const { request, response } = require("express");
//importar los modelos
const Usuario = require("../models/usuariosModel");
const Categoria = require("../models/categoriaModel");
const Curso = require("../models/cursoModel");

const coleccionesPermitidas = ["usuarios", "categorias", "cursos"]; //Definir esto para que si o si nos manden estas colecciones y no otras.

//funciones anonimas la debo declarar antes de usarlas
const buscarUsuarios = async (termino, res = response) => {
  //con las expresiones regurales son terminos que sirven para hacer busquedas especificas, armando parametros con un patrón de búsqueda y con estas expresiones regurales lo podemos hacer como insensible, es decir que no importa si es may o min.
  const regex = new RegExp(termino, "i"); //RegExp hace que regex sea una expresion regular y la "i" hace insensible a lo que envio, viene de las expresiones regurales.

  //buscar usuarios
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }], //Puede buscar el nombre o el correo por eso OR, es decir usamos OR cuando buscamos el termino en mas de un campo del model
    $and: [{ estado: true }], //y=AND que me traiga los usuarios activos
  });
  res.json({
    results: usuarios, //me devuelve los usuarios que encontro y lo muestra
  });
};

//buscar categorias
const buscarCategorias = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");
  const categorias = await Categoria.find({
    nombre: regex,
    estado: true, //lo ponemos asi xq solo buscamos en un campo
  });
  res.json({
    results: categorias, //si no encuentra nada, no me devuelve nada
  });
};

//buscar cursos
const buscarCursos = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");
  const cursos = await Curso.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    results: cursos,
  });
};

//función principal de búsqueda--------------------------------------
const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params; //el nombre es el nombre que lo definimos en la ruta
  //validamos la coleccición
  if (!coleccionesPermitidas.includes(coleccion)) {
    //si la colección que recibimos como params no esta incluida colecionesPermitidas...
    return res.status(401).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  //de acuerdo a la colección, buscar por el termino
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res); //le mandamos res xq si encontramos o no vamos a tener una respuesta
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "cursos":
      buscarCursos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Hubo un error al hacer la búsqueda.",
      });
      break;
  }
};

module.exports = { buscar };
