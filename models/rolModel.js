const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});
module.exports = model("Rol", RolSchema);
//Este modelo lo creamos en la bd de forma manual pero esta bueno xq si necesitamos un rol mas solo lo agregamos desde la bd y no tenemos que estar modificando nuestro codigo
