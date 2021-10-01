"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// Arduino
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));
const registros_controllers_1 = require("../controllers/registros.controllers");
// Peticion que obtiene todos los registros recoletados por el dispositivo
router.route('/historico').get(registros_controllers_1.getTest);
// Peticion que obtiene la temperatura promedio por dia
router.route('/temperatura/promedio').get(registros_controllers_1.getTemperaturaPromedio);
// Peticion que obtiene la velocidad del viento promedio por dia
router.route('/velocidadviento/promedio').get(registros_controllers_1.getVelocidadVientoPromedio);
// Peticion que obtiene el promedio de la temperatura global
router.route('/temperatura/promGlobal').get(registros_controllers_1.getTemperaturaPromedioGlobal);
// Peticion que obtiene el promedio de la velocidad del tiempo global
router.route('/velocidadviento/promGlobal').get(registros_controllers_1.getVelocidadPromedioGlobal);
// Conexión Arduino
port.on("open", () => {
    // prueba
    console.log("se abrió la comunicación :v");
});
parser.on("data", (data) => {
    console.log("data");
    // Insertar registros
});
exports.default = router;
