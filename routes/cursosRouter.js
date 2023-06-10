const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");

const { validarJWT } = require("../middlewares/validar-jwt"); //validamos que este logueado el usuario
const { esAdminRole } = require("../middlewares/validar-roles");
const {
  obtenerCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  borrarCurso,
} = require("../controllers/cursosController");
const { cursoExiste } = require("../helpers/db_validators");

const router = Router();
router.get("/", obtenerCursos); //traigo todas las Cursos y no hace validar JWT xq mostrare en el home sin que esten logueados
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    //validar si existe una Curso con ese id xq puede ser que sea un id valido pero que no exista una Curso con ese id
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  obtenerCurso
); //traigo solo una Curso por su id
router.post(
  "/",
  [
    validarJWT,
    esAdminRole, //Para validar que solo los admin pueden crear una Curso nueva,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCurso
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  actualizarCurso
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(cursoExiste),
    validarCampos,
  ],
  borrarCurso
);

module.exports = router;
