//Funciones que nos permitiran validar datos antes de guardar en la bd
//Debo importar el modelo que voy a validar
const Categoria = require("../models/categoriaModel");
const Rol = require("../models/rolModel");
const Usuario = require("../models/usuariosModel");
//validar rol
const esRolValido = async (rol) => {
  //Toda consulta que se hara a la bd debe ser asincrona
  const existeRol = await Rol.findOne({ rol }); //busca el campo rol del rol que estoy recibiendo como parametro que es el que coloca el usuario; rol:rol
  if (!existeRol) {
    //como no recibimos el req ni res, usamos el throw new Error
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};

//verificar el correo
const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo }); //findOne es un metodo de los modelos es como el find de los array. Para hacer esta busqueda antes debo importar el modelo Usuario.
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya se encuentra en la base de datos`);
  }
};
//si existe el usuario por id
const usuarioExiste = async (id) => {
  const existeUsuario = await Categoria.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID ${id} no se encuentra en la base de datos`);
  }
};

//si existe el categoria por id
const categoriaExiste = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(
      `El ID ${id} no corresponde a ninguna categoria registrada en la base de datos`
    );
  }
};
const cursoExiste = async (id) => {
  const existeCurso = await Curso.findById(id);
  if (!existeCurso) {
    throw new Error(
      `El ID ${id} no corresponde a ninguna curso registrado en la base de datos`
    );
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  usuarioExiste,
  categoriaExiste,
  cursoExiste,
};
