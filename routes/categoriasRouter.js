const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");

const { validarJWT } = require("../middlewares/validar-jwt"); //validamos que este logueado el usuario
const { esAdminRole } = require("../middlewares/validar-roles");
const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoriasController");
const { categoriaExiste } = require("../helpers/db_validators");

const router = Router();
router.get("/", [validarJWT], obtenerCategorias); //traigo todas las categorias y para que pueda ver las categorias debera estar logueado y por eso validamos el JWT
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    //validar si existe una categoria con ese id xq puede ser que sea un id valido pero que no exista una categoria con ese id
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  obtenerCategoria
); //traigo solo una categoria por su id
router.post(
  "/",
  [
    validarJWT,
    esAdminRole, //Para validar que solo los admin pueden crear una categoria nueva,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  actualizarCategoria
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
