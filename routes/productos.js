const Router = require('express');
const {check} = require('express-validator');

const {validarCampos,
    validarJWT,
    tieneRole,
    esAdminRole
   } = require('../middlewares');

const {crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
    Test} = require('../controllers/productos');
const { existeProductoId, existeCategoriaId } = require('../helpers/db-validators');


const router = Router();

router.get('/test', Test );


router.get('/',  obtenerProductos);


router.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProducto);


router.post('/',[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de mongo").isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id').custom(existeProductoId),
    check('categoria').isMongoId().custom(existeCategoriaId),
    validarCampos
], actualizarProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],eliminarProducto);


module.exports = router;

