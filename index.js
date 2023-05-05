// const express = require("express"); //Manera que importare desde ahora en mas. Importamos express
// const app = express(); //Para poder usarla hago esto. App sera la const con la que voy a poder acceder a todos los metodos que tiene express

//esto es como una ruta
// app.get("/", function (req, res) {
//   //Con el metodo get hago una peticion. "/" a la ruta de raiz
//   res.send("Hello mundooooo");
// });

// app.listen(8080);

//Con esto ya podemos levantar el servidor de la clase server
const Server = require("./models/server"); //Importamos Server
require("dotenv").config(); //Configuramos el acceso de nuestra variable de entorno en cualquier parte de nuestro proyecto
//Debemos crearnos una instancia
const server = new Server(); //Instancia, server es un servidor creado con la clase Server donde tiene acceso a todo. Recordando que la instancia de una clase es un objeto que contiene todas las propiedades de esa clase

server.listen(); //Metodo que levanta mi servidor LISTEN
