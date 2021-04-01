const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete }
 = require('../controllers/usuarios');
const { esRoleValido, emailExite, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);;

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty().isString(),
    check('password','la contraseña de tener minimo 6 letras').isLength(6),
    check('correo').custom(emailExite),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    // check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos
], usuariosPost);

router.patch('/:id?', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

module.exports = router;