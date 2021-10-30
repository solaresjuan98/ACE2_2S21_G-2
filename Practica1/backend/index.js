const express = require("express");
// Libreria que lee el puerto serial
const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
const { dbConnection } = require("./db/config");
// El SerialPort puede cambiar dependiendo del equipo
const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));
// Configurar cliente de mongoDB
const MongoClient = require('mongodb').MongoClient;
// variables de entorno
require("dotenv").config();
const { response } = require("express");
// Cadena de conexión a la base de datos en la nube
const uri = process.env.BD_CNN;
// Crear el servidor/aplicación de express
const app = express();

// Conexion a Base de datos
dbConnection();


port.on("open", () => {
    console.log("Se abrió la comunicación");

})

parser.on("data", data => {
    console.log(data);

    setTimeout(() => {
        insertData(data);
    }, 100);
        

});

// Peticion get
// endpoint: http://localhost:4000/
app.get("/", (req, res) => {
    res.json({
        ok: true,
        message: "Mensaje de prueba",
    });
});

// Peticion get para obtener el ultimo registro
app.get("/ultimoRegistro", (req, res) => {

    MongoClient.connect(uri, (err, db) => {

        if (err) throw err;
        const dbo = db.db('dbClima');
        dbo.collection('registro').find().toArray((err, response) => {
            if (err) throw err;
            res.json(response[response.length - 1]);
        })
    })

})

// Peticion get para obtener todos los registros
// endpoint: http://localhost:4000/registros
app.get("/registros", async (req, res) => {

    MongoClient.connect(uri, (err, db) => {

        if (err) throw err;
        const dbo = db.db('dbClima');
        dbo.collection('registro').find().toArray((err, response) => {
            if (err) throw err;
            res.json(response);
        })
    })

})

// Funcion para insertar en la base de datos
const insertData = (data) => {

    MongoClient.connect(uri, (err, db) => {
        if (err) throw err;
        const dbo = db.db('dbClima');
        const obj = JSON.parse(data);
        console.log(obj);
        dbo.collection('registro').insertOne(obj, (err, res) => {
            if (err) throw err;
            db.close();
        });
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
