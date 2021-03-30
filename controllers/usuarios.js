const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'no name', page = 1, apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        q, 
        nombre,
        apikey
 })
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad,
 })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'put API - controlador',
        id
 })
}

const usuariosPatch = (req, res = response) => {
    const id = req.params.id

    res.json({
        msg: 'pach API - controlador',
        id
 })
}

const usuariosDelete = (req, res = response) => {
    const id = req.params.id

    res.json({
        msg: 'delete API - controlador',
        id
 })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}