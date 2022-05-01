const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload')

// inicializar el repo con todo yes por default: npm init - y
// npm install dotenv express
// recuperar archivos: git chekout -- .

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;
        this.path =
        {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
       this.app.use(this.path.auth, require('../routes/auth'));
       this.app.use(this.path.usuarios, require('../routes/usuarios'));
       this.app.use(this.path.categorias, require('../routes/categorias'));
       this.app.use(this.path.productos, require('../routes/productos'));
       this.app.use(this.path.buscar, require('../routes/buscar'));
       this.app.use(this.path.uploads, require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto",this.port);
        });
    }

}



module.exports = Server;