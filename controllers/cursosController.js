const { response, request } = require("express");
const Curso = require("../models/cursoModel"); //Porque trabajamos sobre esta collecion

const obtenerCursos = async (req = request, res = response) => {
  //Obtener todas las cursos paginadas con el total
  const { from = 0, limit = 10 } = req.query;
  const query = { estado: true };

  const [total, cursos] = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("usuario", "correo") //traigo el dato correo del model usuario
      .populate("categoria", "nombre"), //Con Number(from) lo que hace es lo obliga a from a ser un number lo mismo como el limit, puedo o no usarlo pero no esta de mas.
  ]);

  res.json({
    total,
    cursos,
  });
};

const obtenerCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const curso = await Curso.findById(id)
    .populate(
      "usuario", //campo en el modelo de Cursos donde tengo almanecenado el id
      "correo" //datos que quiero traer del modelo Usuario, con populate hacemos una conexio entre ambos modelos
    )
    .populate("categoria", "nombre");

  res.json({
    curso,
  });
};

const crearCurso = async (req = request, res = response) => {
  const { precio, categoria, descripcion, img } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  //verificar si el Curso ya existe
  const cursoDB = await Curso.findOne({ nombre }); //Con findOne decimos "Que encuentre el Curso con ese {nombre}"

  if (cursoDB) {
    res.status(400).json({
      msg: `El Curso ${cursoDB.nombre} ya existe`,
    });
  }
  //generar la data que vamos a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    img,
    usuario: req.usuario._id, //viene del JWT de la validacion
  };

  const curso = new Curso(data);

  await curso.save();

  res.status(201).json({
    curso,
    msg: "Curso creado con exito",
  });
};

const actualizarCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, destacado, img } = req.body;
  const usuario = req.usuario._id;

  const data = {
    precio,
    descripcion,
    categoria,
    destacado,
    img,
    usuario, //que esta haciendo el cambio
  };
  if (req.body.nombre) {
    //Si es que viene nombre en el body
    data.nombre = req.body.nombre.toUpperCase(); //Lo agregamos a la data
  }
  const curso = await Curso.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: `Curso actualizado`,
    curso,
  });
};

const borrarCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const cursoInactivo = await Curso.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    cursoInactivo,
    msg: "El curso fue inactivado",
  });
};
module.exports = {
  obtenerCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  borrarCurso,
};
