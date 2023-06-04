const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true, //Nombre sera unico, es decir no habra mas de una categoria con el mismo nombre
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  //Para guardar el id del usuario
  usuario: {
    type: Schema.Types.ObjectId, //Este usuario sera tipo objectId que viene de una propiedad llamada type del Schema
    ref: "Usuario", //Esto para traer datos de usuario, en este caso el id.
    required: true,
  },
});

module.exports = model("Categoria", CategoriaSchema);
