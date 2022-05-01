const Router = require('express');
const {check} = require('express-validator');

const {validarCampos, validarArchivoSubir} = require('../middlewares')
const {cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploads')
const {coleccionesPermitidas} = require('../helpers/db-validators')

const router = Router()

router.post('/',validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'El id deber se un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id',[
    check('id', 'El id deber se un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
], mostrarImagen)


module.exports = router;