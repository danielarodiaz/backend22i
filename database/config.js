const mongoose = require("mongoose"); //importamos la libreria
//creamos la funcion donde nos conectaremos a nuestra db
const dbConnection = async () => {
  //try catch herramienta de js para controlar errores, try --> todo ok, catch cuando hay un error
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar BD"); //Metodo que nos devuelve en formato de error al msj
  }
};

module.exports = {
  dbConnection,
};
