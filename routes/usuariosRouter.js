const { Router } = require("express"); //Nos permite hacer el ruteo. Router es un metodo
const { check } = require("express-validator"); //Nos permitira chekear segun el campo que queremos validar
const { validarCampos } = require("../middlewares/validar_campos");
const { esRolValido, emailExiste } = require("../helpers/db_validators");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosController");

const router = Router(); // nos creamos una const router para manejar todas las funciones que tiene el meotod Router y lo voy llamando por ejemplo en router.get, router.post, etc
// router.get("/", function (req, res) {
//   const { apiKey, limit } = req.query;
//   res.json({
//     mensaje: "Get Usuarios",
//     apiKey,
//     limit,
//   });
// });
//En todas las peticiones solo ponemos como direccion "/" xq luego sera reemplazada por la direccion que esta puesta en this.usuariosPath
router.get("/", usuariosGet); //usuariosGet esta en controller y lo mismo con las demas peticiones
//Lo colocamos aqui a las validaciones xq tiene que hacerse antes de llegar a la bd
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener un minimo de 6 caracteres"
    ).isLength({ min: 6 }), //.isLength recibe un min o max
    check("correo", "No es un correo valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido), //esRolValido es de helpers y hay que importarlo aqui para poder usarlo
    //check("rol", "El rol no es valido").isIn(["USER_ROLE", "ADMIN_ROLE"]), //En isIn van los valores posibles y no lo usamos xq es muy manual
    validarCampos,
  ],
  usuariosPost
); //Los datos entre la direccion y la funcion son los midlewers, check (nombre del campo (exactante igual), y mensaje para el front) .notEmpty es el metodo que verifica la validacion, se fija que no sea vacio.

//Peticion que nos permite actualizar un registro en un bd con su /:id
router.put("/:id", usuariosPut);

router.delete("/:id", usuariosDelete);

module.exports = router;
