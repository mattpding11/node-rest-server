const {response, request} = require('express');
const {Categoria} = require('../models/index'); // or require('../models') es lo mismo por el index otra forma de exportar categoria

// obtenerCategorias - pagina - total - populate


const Test = (req, res) => {

    res.json({
        Test: "Prueba exitosa"
    })
}

const obtenerCategorias = async (req = request, res = response) => {

    const {desde = 0, limite = 5} = req.query;

    const query =  {estado: true};

    // const categorias = await Categoria.find(query).skip(Number(desde)).limit(Number(limite));

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    })
}


const obtenerCategoria = async(req, res = response) => {

    const id = req.params.id;

    console.log(id)

    const categoria =  await Categoria.findById(id);

    res.json({
        categoria
    })

}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    console.log(categoriaDB);

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // Crear instancia de categoria
    const categoria = new Categoria(data);

    // Guardar categoria
    await categoria.save();

    res.status(201).json(categoria);

} 

// Actualizar categoria

const actualizarCategoria = async(req , res = response) => {
    
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria)

}

// Eliminar categoria estado false

const eliminarCategoria  = async(req, res = response) => {

    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false},{new: true})

    res.json(categoriaBorrada)
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria,
    Test
}