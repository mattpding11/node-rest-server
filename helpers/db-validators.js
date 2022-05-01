const {Usuario, Categoria, Producto} = require('../models/index');
const Role = require('../models/role');


const esRoleValido =  async (rol = '') => {
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


const existeCategoriaId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){ 
        throw new Error(`El id ${id} no existe`);
     }
};

const existeProductoId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){ 
        throw new Error(`El id ${id} no existe`);
     }
};


const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {

    const includes = colecciones.includes(coleccion)

    if(!includes){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones} `)
    }

    return true

}


module.exports = {
    esRoleValido,
    emailExite,
    existeUsuarioId,
    existeProductoId,
    existeCategoriaId,
    coleccionesPermitidas
}