const { Router } = require("express"); //Nos permite hacer el ruteo. Router es un metodo
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

router.post("/", usuariosPost);

//Peticion que nos permite actualizar un registro en un bd con su /:id
router.put("/:id", usuariosPut);

router.delete("/:id", usuariosDelete);

module.exports = router;
