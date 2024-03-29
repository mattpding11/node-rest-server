const {response}  = require('express');
const { isValidObjectId } = require('mongoose');
const {Usuario, Categoria, Producto} = require("../models/index")

const coleccionesPermitidas = ["usuarios","categorias","productos","roles"]

const buscarUsuarios = async(termino = '', res) => {
    const esMongoId = isValidObjectId(termino);
    if(esMongoId){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario]: []
        })
    }

    const regex = new RegExp(termino.trim(), 'i')

    console.log(regex);


    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado:true}]
    })

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino = '', res) => {
    const esMongoId = isValidObjectId(termino);
    if(esMongoId){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria]: []
        })
    }

    const regex = new RegExp(termino.trim(), 'i')

    console.log(regex)

    const categorias = await Categoria.find({nombre: regex, estado: true})

    res.json({
        results: categorias
    })
}

const buscarProductos = async(termino = '', res) => {
    const esMongoId = isValidObjectId(termino);
    if(esMongoId){
        const producto = await Producto.findById(termino)
        return res.json({
            results: (producto) ? [producto]: []
        })
    }
   
    const regex = new RegExp(termino.trim(), 'i')

    console.log(regex)

    const productos = await Producto.find({nombre: regex})
                        .populate('categoria','nombre')

    res.json({ 
        results: productos
    })
}
 

const buscar = async(req, res = response) => {

    const {coleccion,termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: 'Las colecciones permitidas son: '+coleccionesPermitidas
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;

        case 'productos':
            buscarProductos(termino,res)
            break;
    
        default:
            res.status(500).json({msg:"se le olvido hacer la consulta"})
            break;

    }


}

module.exports = {buscar};