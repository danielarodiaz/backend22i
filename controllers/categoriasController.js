const { response, request } = require("express");
const Categoria = require("../models/categoriaModel");

const obtenerCategorias = async (req = request, res = response) => {
  //Obtener todas las categorias paginadas con el total
  const { from = 0, limit = 10 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(from).limit(limit).populate("usuario", "correo"), //con populate traigo el correo del usuario que creo esa categoria
  ]);

  res.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate(
    "usuario", //campo en el modelo de categorias donde tengo almanecenado el id
    "nombre correo" //datos que quiero traer del modelo Usuario, con populate hacemos una conexio entre ambos modelos
  );

  res.json({
    categoria,
  });
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase(); //Guardamos los nombres en may
  //verificar si la categoria ya existe
  const categoriaDB = await Categoria.findOne({ nombre }); //Con findOne decimos "Que encuentre una categoria con ese {nombre}"

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }
  //generar la data que vamos a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  await categoria.save();

  res.status(201).json({
    categoria,
    msg: "Categoria creada con exito",
  });
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const usuario = req.usuario._id;

  const data = {
    nombre,
    usuario, //que esta haciendo el cambio
  };
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: `Categoria actualizada`,
    categoria,
  });
};

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoriaInactiva = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    categoriaInactiva,
    msg: "La categoria fue inactivada",
  });
};
module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
