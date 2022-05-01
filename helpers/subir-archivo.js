const { model } = require('mongoose');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const {img} = files;

        const nombreCortado = img.name.split('.')
    
        const extension = nombreCortado[nombreCortado.length-1]
    
        if (!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
        }
    
        const nombreTemporal = uuidv4() + '.' + extension;
    
        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);
    
        // if (!req.files.img) {
        //     return res.status(400).send('No hay archivos para subir.');
        //   }
    
        img.mv(uploadPath, (err) => {
            if (err){
                return reject(err);
            }
            return resolve(nombreTemporal)
        })

    })



}


module.exports = {
    subirArchivo
}