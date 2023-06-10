const { Schema, model } = require("mongoose");

const cursoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId, //guardamos el usuario que creo el curso
    ref: "Usuario",
    require: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId, //Mandamos el id de la categoria para traer esa inf
    ref: "Categoria",
    require: true,
  },
  descripcion: {
    type: String,
  },
  img: {
    type: String,
  },
  destacado: {
    //Cursos destacados que aparecen en el home, el adm puede elegir los cursos destacados desde el front
    type: Boolean,
    default: false,
  },
});

module.exports = model("Curso", cursoSchema);
