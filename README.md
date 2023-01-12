# Aplicación Rest con NodeJS y conexión a base da datos con Mongo DB

Puede probar la api rest haciendo las peticiones desde postman a este back https://node-rest-server.up.railway.app, puede hacerlo desde su equipo siguiendo estos ejemplos en la **documentación** _**<https://documenter.getpostman.com/view/10033004/Uz5CMHyt>**. Este consume los endpoints aplicación que esta desplegada en un servidor web.

En la documentación cambie el lenguaje de **cURL a HTTP** para mejor comprensión 

![imagen](https://res.cloudinary.com/drbotbbjb/image/upload/v1653938308/Screenshot_151_hyuwf2.png)

![imagen](https://res.cloudinary.com/drbotbbjb/image/upload/v1653938308/Screenshot_152_enbw7p.png)

____

O lo puede probar desde su equipo local siguiendo estos pasos

Entre al siguiente enlace _<https://documenter.getpostman.com/view/10033004/Uz5Doc1U>_ para ver la documentación desde la aplicación en local

Si quiere usar esta aplicación en su local por favor:
-	Clone o descargue el repositorio 
- **En la carpeta raíz del proyecto cree un archivo llamado .env, dentro de el copie y pegue las siguientes variables de entorno**

PORT=8080

MONGODB_CNN=mongodb+srv://[user]:[password]@miclustercafe.1dnc6.mongodb.net/[db_name]

USER=
  
PASS=
  
SECRETORPRIVATEKEY=Est03sMyPublicKey
  
GOOGLE_CLIENT_ID=
  
GOOGLE_SECRET=

CLOUDINARY_URL=


- Para loguearse con Google debe ir a **Google Cloud**, en la herramienta de **Api y servicio** crear un proyecto donde debe copiar y pegar las credenciales que aquí están en **GOOGLE_CLIENT_ID** y **GOOGLE_SECRET**
  
-	Ingrese a mongo atlas y crea una cuenta
-	Cree el cluster inicial
-	Luego en la parte de seguridad en acceso de base de datos cree un nuevo usuario, coloque cualquier nombre, y cree o genere una nueva contraseña 
-	En la parte de privilegios escoja el rol de escritura y lectura y dele crear.
-	Luego vaya al archivo .env del proyecto y remplace las variables de entorno de user y password por las suyas 
-	Luego vaya a mongose atlas en el navegador vayase a cluster, luego dele en conexión 
-	Dele en conectarse con mongose compass y si no lo tiene descargado, dele en la opción que no tiene el compass y le saldrá un botón para descargarlo
-	Luego de haberlo instalado, abra el compass
-	Luego en en mongo atlas donde se quedo en el la conexión, copie la cadena de conexión de mongose y pegela en el .env en la variable MONGODB_CNN
-	En esa variable de entorno remplace <user> por su user y <password> por su password y <db_name> por el nombre de la base de datos que usted quiere crear
-	Para crearla simplemente vaya al compass y cree una nueva colección y ese nombre es el que va colocar en la cedan de conexión
-	 o si quiere dejarla por defecto deje test sin los caracteres <>
-	Luego abra su db compass y cree una nueva conexión, donde dice uri, pege su cadena de mongo_cnn del .env y presione conectar 
-	Si se conectó correctamente ya debería funcionar la aplicación, antes de probar los endpoint recuerde crear usuarios primero ya que los que aparecen en la documentación son los que yo use para las pruebas en mi equipo (tome de ejemplo la documentación de postman aquí
<https://documenter.getpostman.com/view/10033004/Uz5Doc1U>)
- Para subir imágenes, puede usar cloudinary para subir imágenes y videos, cree una cuenta y copie la variable de entorno que le da [cloudinary](https://cloudinary.com/), cópiela y péguela en CLOUDINARY_URL
  
 ---
  
### Contact
 
🌐 Portafolio web: https://mattpding11.github.io/mateo 
  
🌐 LinkedIn: https://www.linkedin.com/in/mateo-pe%C3%B1aranda-diaz-fullstack-developer/
  
✉️ Correo: mateo_1999_7@outlook.es

