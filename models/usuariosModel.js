//Creamos el modelo de datos de usuario para que podamos guardar datos y seran parecidos los demas modelos
//nombre
//correo
//password
//img
//rol (User, Admin)
//estado (true, false)

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"], //true xq es necesario y el mensaje por si no lo envian al dato, en este caso el nombre. Sera devuelto por el servidor de la bd, no lo ve el front
  },
  correo: {
    type: String, //Asi lo recibe la bd por eso no es de tipo email
    required: [true, "El correo es obligatorio"],
    //Como no agregamos un ID como identificador unico xq la base de dato ya lo crea. Entonces definimos algun dato que cargan para definir como valor unico.
    uniqued: true, //Correo unico
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    //dsp veremos como validar el password. Y tambien encriptaremos para que se guarde asi.
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true, //No lo ponemos como arreglo xq solo es true y no va con msj
    //enum: ["USER_ROLE", "ADMIN_ROLE"], //Ponemos las opciones de rol con la propiedad enum pero no lo necesitamos xq ya lo haremos en la bd xq esto es manual y nuestro proyecto puede crecer
  },
  estado: {
    type: Boolean,
    default: true, //Cada vez que yo cree un usuario por defecto el estado estara en true
  },
});

//quitar datos en la respuesta json
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject(); //esto hace referencia al objeto que crearemos con este modelo ; ...usuario traemos todo lo de usuario menos __v y password
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema); //Nombre de la coleccion(modelo) y a que esquema pertebece
