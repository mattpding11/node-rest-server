const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete }
 = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id?', usuariosPut)

router.post('/', usuariosPost);

router.patch('/:id?', usuariosPatch);

router.delete('/:id?', usuariosDelete);

module.exports = router;