const express = require("express");
const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");

// Crear el servidor/aplicación de express
const app = express();


const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({delimiter: "\n"}));

port.on("open", () => {
    console.log("Se abrió la comunicación");
})

port.on("data", (data) => {
    console.log(data)
} )

// Peticion get
app.get("/", (req, res) => {
    res.json({
        ok: true,
        message: "Mensaje de prueba",
    });
});

app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${4000}`);
});
