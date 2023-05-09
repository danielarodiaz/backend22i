const { response, request } = require("express");
//const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //Importar libreria para encriptar contraseña
const Usuario = require("../models/usuariosModel"); //import el modelo

const usuariosGet = async (req = request, res = response) => {
  //Recibe algo que manda el cliente y lo que le respondera el servidor
  //const { apiKey, limit } = req.query; //parametros despues del signo de pregunta en la consulta
  const { from = 0, limit = 10 } = req.query; //le ponemos valores por defect si el usuario no me manda nada
  const query = { estado: true }; //query es el nombre de una variable, no es lo mismo que req.query y lo que hace es que solamente tenga en cuenta los registro con estado true
  // const usuarios = await Usuario.find().skip(from).limit(limit);
  // const total = await Usuario.countDocuments(); //contame todos los doc que haya, osea la cant de registros
  //Desestructuro un arreglo, esto nos sirve para que la respuesta sea mas rapida si es que tenemos muchos registros esto lo vemos a la par del status 200 de la resp
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(from).limit(limit),
  ]); //Promise.all = que haga todas las promesas,arreglo de promesas, en este caso resuelve ambas promesas
  res.json({
    usuarios,
    total,
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

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params; //request tiene una funcion llamada params que trae todos los parametros que manda desde la raiz, obtenemos el id
  //obtener datos a actualizar
  const { password, correo, ...resto } = req.body; //datos que manda el front por eso body. Sacamos password y correo e ...resto es lo que queda del objeto
  //Si actualizo el password debo cifrarlo o encriptarlo
  if (password) {
    //preg si viene password primero
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt); //Ponemos la nueva password, creamos de nuevo la prop password
  }
  //buscar el usuario y actualizarlo
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true }); //new:true lo que hace es que una vez que lo actualice, guarde los datos en la variable usuario actualizado
  res.json({
    mensaje: "Usuario actualizado",
    usuario,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  //para eliminar el registro
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id); //No es buena practica esto xq generalmente no se borra nada de la bd, solo se inactiva!

  //Para cambiar el estado a false, osea inactivarlo
  const usuario = await Usuario.findById(id);
  if (!usuario.estado) {
    return res.json({
      mensaje: "El Usuario ya esta inactivo",
    });
  }
  const usuarioInactivado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  ); //con { estado: false } inactivamos el usuario cambiando su estado a false
  res.json({
    mensaje: "Usuario borrado",
    //usuarioBorrado,
    usuarioInactivado,
  });
};

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }; //Entre corchetes xq exportaremos muchas funciones
