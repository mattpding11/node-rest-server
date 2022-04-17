const {response, request} = require('express');
const {Producto} = require('../models/index'); 


const Test = (req, res) => {

    res.json({
        Test: "Prueba exitosa"
    })
}

const obtenerProductos = async (req = request, res = response) => {

    const {desde = 0, limite = 5} = req.query;

    const query =  {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    })
}


const obtenerProducto = async(req, res = response) => {

    const id = req.params.id;

    const producto =  await Producto.findById(id);

    res.json({
        producto
    })

}


const crearProducto = async (req = request, res = response) => {

    const {usuario, estado, ...body} = req.body;

    const productoDb = await Producto.findOne({nombre: body.nombre});

    console.log(productoDb);

    if(productoDb) {
        return res.status(400).json({
            msg: `El producto ${productoDb.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    // Crear instancia de categoria
    const producto = new Producto(data);

    // Guardar categoria
    await producto.save();

    res.status(201).json(producto);

} 

// Actualizar categoria

const actualizarProducto = async(req , res = response) => {
    
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    // data.categoria = data.categoria.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto)

}

// Eliminar categoria estado false

const eliminarProducto  = async(req, res = response) => {

    const {id} = req.params;

    const productoBorrada = await Producto.findByIdAndUpdate(id, {estado: false},{new: true})

    res.json(productoBorrada)
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
    Test
}