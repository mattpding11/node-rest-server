const Router = require('express');
const {check} = require('express-validator');

const {validarCampos,
    validarJWT,
    tieneRole,
    esAdminRole
   } = require('../middlewares');

const {crearCategoria,
     obtenerCategorias,
     obtenerCategoria,
     actualizarCategoria,
    eliminarCategoria} = require('../controllers/categorias');
const { existeCategoriaId } = require('../helpers/db-validators');


const router = Router();

// Las funciones deben de check deben llevar el ()

// router.get('/test', Test );


// Obtener todas las categorias
router.get('/',  obtenerCategorias);


// Obtener categoria por id
router.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
],crearCategoria);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de mongo').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaId),
    validarCampos
], actualizarCategoria);

// Eliminar categoria - privado - cualquier persona con un token valido
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],eliminarCategoria);


module.exports = router;

