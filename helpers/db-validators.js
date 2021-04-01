const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido =  async (rol = '') => {
    console.log("melo");
    const existeRol = await Role.findOne({ rol }) 
    if(!existeRol) {
        throw new Error(`El rol '${rol}' no esta registrado en DB`);
    } 
}

const emailExite = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error('Este correo ya esta registrado');
     }
};

const existeUsuarioId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){ 
        throw new Error(`El id ${id} no existe`);
     }
};


module.exports = {
    esRoleValido,
    emailExite,
    existeUsuarioId
}