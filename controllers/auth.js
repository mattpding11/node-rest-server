
const {response, request} = require('express');
const bycriptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

// colocar esto: req = request, res = response, es solo para que nos ayude con el tipado
// osea que nos aparezcan las propiedades de las variables

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


const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            // tengo que crearlo
            const data = {
                nombre,
                correo,
                password: '123',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB

        if(!usuario.estado){
            res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el json web token

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    }catch(err){
        res.status(400).json({
            msg: 'Token de google no es valido'
        });
    }
  
}

module.exports = {
    login,
    googleSignin
}