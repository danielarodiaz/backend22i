const express = require("express");
//Importamos los cors que tienen que ver con la politica de seguridad. (Libreria)
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    //Este constructor es lo que se ejecutara cada vez que yo cree una instancia de esta clase. Arma todo lo que necesitamos
    this.app = express(); //es lo mismo que poner const app = express(), solo ponemos el this que es el que llama a la propiedad app que forma parte del objeto que creo con server.
    this.port = process.env.PORT;
    this.authPath = "/api/auth"; //1er paso para la autenticacion de usuario
    this.usuariosPath = "/api/usuarios"; //usuariosPath es solo un nombre
    this.categoriasPath = "/api/categorias";
    //CONECTAR CON BASE DE DATOS
    this.conectarDB();

    //middlewares, son funciones especiales que es el nodo entre lo que envia el usuario y lo que recibe el servidor. Nos sirve para hacer validaciones por ejemplo.
    this.middlewars();

    //funcion para las rutas. Debo llamar este metodo en el constructor para poder acceder a las rutas. Y Siempre va abajo de los middlewars, xq lo primero es que debo ejecutar los middlewars y luego llamar a las rutas.
    this.routes(); //si no lo llamo, no tendre acceso a las rutas cuando se levante el servidor y me dara un error xq no encontrara ninguna ruta.
  }
  //Despues del constructor nos podemos crear funciones

  async conectarDB() {
    await dbConnection();
  }

  middlewars() {
    //Son funciones que existen entre la peticion que hace el fronted y la respuesta que hace el servidor. Es el nodo, intermediario. Lo podemos usar como:
    //Los middlewars aparecen con la palabra USE
    //1. CORS, de esta manera habilitamos que desde otra direccion fuera de mi servidor pueda hacer peticiones, osea con los cors ya tenemos estos permisos de navegar.
    this.app.use(cors());
    //2. LEER lo que envia el usuario por el cuerpo de la peticion
    this.app.use(express.json()); //habilitamos nuestro servidor para que lo que venga lo ponga en formato json, osea el formato de lectura que el servidor pueda interpretar
    //3. DEFINIR la carpeta publica, es donde en el servidor se encuentran los archivos estaticos de nuestra web.
    this.app.use(express.static("public")); //carpeta public creada por nosotros (que tiene que tener el mismo nombre que definimos aqui entre parentesis "public"), donde estaran archivos estaticos osea la pag web. Por defecto toma / para mostrar el mensaje de la pagina
  }
  //Aqui el usuario o front podra solicitar informacion
  routes() {
    this.app.use(this.authPath, require("../routes/authRouter")); //2do paso para la autenticacion de usuario
    this.app.use(this.usuariosPath, require("../routes/usuariosRouter")); //Creamos esto para que sea mas mantenible. Definimos cual sera la ruta que el cliente va a llamar, el archivo donde estaran todas las rutas. use.(seria como middlewars de la ruta) ; this.usuariosPath definido dentro de la clase server. Y lo que hara sera, fijarse que peticion pide el usuario, va al archivo usuarios.js y se fija de acuerdo a la peticion que hizo el usuario y lo ejecuta.
    this.app.use(this.categoriasPath, require("../routes/categoriasRouter"));

    //Manejara todas las rutas donde va a solicitar info nuestro servidor
    // this.app.get("/api/usuarios", function (req, res) {
    //   //Con el metodo get hago una peticion. "/" o lo qe ponga en (" ", )a la ruta de raiz
    //   //res.send("Hello mundooooo");
    //   res.json({ //Para que no sea un texto plano sino un text en formato JSON y eso es lo que me mostrara. Pero esto lo haremos en POSTMAN
    //     mensaje: "Soy una api de usuarios",
    //   });
    // });
  }
  //Nos creamos una funcion xq necesito escuchar el puerto
  listen() {
    this.app.listen(this.port, () => {
      //console.log("Server Online port 8080"); //Mensaje que vamos a recibir cuando estemos escuchando el puerto 8080
      console.log("Server Online port: ", this.port);
      //console.log(process.env); //Acceso a los procesos de mi servidor y lo muestra en consola cuando ejecuamos node index.js
    }); //Es lo mismo que app.listen(8080);
  }
}

module.exports = Server; //export default Server (en fronted)
