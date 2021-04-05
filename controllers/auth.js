
const {response, request} = require('express');
const bycriptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    try {

        // Verificar si el email existe

        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                 msg: 'USUARIO / password no son correctos - correo'
            })
        }

        // Si el usuario esta activo
        
        if(!usuario.estado){
            return res.status(400).json({
                 msg: 'USUARIO / password no son correctos - estado'
            })
        }

        // Verificar la contraseña

        const validPassword = bycriptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'USUARIO / password no son correctos - password'
           })
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login ok",
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
           msg: 'Hable con el administrador' 
        });
    }
   
}


module.exports = {
    login
}