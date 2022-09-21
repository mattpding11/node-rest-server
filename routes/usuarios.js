const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete, Test }
 = require('../controllers/usuarios');

 const {validarCampos,
     validarJWT,
     tieneRole,
     esAdminRole
    } = require('../middlewares');
 
const { esRoleValido, emailExite, existeUsuarioId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

// otra forma
// router.get('/', (req, res) => {
//     res.json("usuarios get")
// });

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

router.get('/test', Test);

// Ejemplo apires
/*router.get('/apirest', (req,res) => {

    fetch('https://reqres.in/api/users?page=2')
    .then(res => res.json())
    .then(console.log)
    .catch(err => console.log(err));

    res.json({
        test: "Prueba exitosa"
    })

})
*/

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);



module.exports = router;