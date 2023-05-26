const jwt = require("jsonwebtoken");
const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    //1. Crear el payload, que es la info que queremos almacenar, payload es un nombre solamente
    const payload = { uid };

    //2. Generar jwt jwt.sign(payload, secretOrPrivateKey, [options, callback])
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se puede generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
