const {response, request} = require('express');
const bycriptjs = require('bcryptjs');
const Usuario = require('../models/usuario');  

const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    let usuarios = []

    if(!isNaN(limite, desde)){
         usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    }

    // const total =  Usuario.countDocuments(query);

    // Desestructuracion de arreglo, con promesas es mas eficiente 
    const [usuarios_, total] = await Promise.all([
        usuarios,
        Usuario.countDocuments(query)
    ]);

    // NUMBER() retorna el numero

    res.json({
        msg: "prueba",
        total,
        usuarios_
    });
}


/*

IMPORTANTE

en el req.params vienen los parametros de la ruta en la url api/:id?

en el req.query vienen los parametros de consulta (query params) api/?limit=5

en el req.body viene el cuerpo de la peticion (el body)(se necesita express.json())

*/

// const usuariosGet = (req = request, res = response) => {

//     const {q, nombre = 'no name' #valor por defecto, page = 1, apikey} = req.query;

//     res.json({
//         msg: 'get API - controlador',
//         q, 
//         nombre,
//         apikey
//  })
// }

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe

    // Encriptar la contraseña
    const salt = bycriptjs.genSaltSync(10);
    usuario.password = bycriptjs.hashSync(password, salt);

    // Guardar
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
 })
}

// los parametros de la ruta vienen en el params, en postman se colocan en la url sin nombrarlos 

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    // Validar contra base de datos
    if(password){
        const salt = bycriptjs.genSaltSync(10);
        resto.password = bycriptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'pach API - controlador',
        id
 })
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // const uid = req.uid;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndRemove(id); 

    // Eliminacion logica
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    const usuarioAutenticado = req.usuario;
  
    // const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({usuario, usuarioAutenticado});
}

const Test = (req, res) => {

    res.json({
        Test: "Prueba exitosa"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    Test
}

