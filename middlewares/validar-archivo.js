const { response } = require('express')

const validarArchivoSubir = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({msg:'No hay archivos para subir. -Validar archivo subir'});
      }
  
    next();
}

module.exports = {
    validarArchivoSubir
}