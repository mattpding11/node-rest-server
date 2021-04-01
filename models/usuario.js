const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        requerid: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligaptorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

// Function porque se referencia al this, una funcion de flecha lo mantiene lo que apunta el this fuera de la misma

// Con esto redefinimos el objeto para que no me muestre en el json la password la version

UsuarioSchema.methods.toJSON = function() {
    const {__v, password,...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
