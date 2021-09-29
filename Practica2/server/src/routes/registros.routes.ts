
import { Router } from 'express';
const router = Router();

// Arduino
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline')
const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));


import {
    getTest,
} from '../controllers/registros.controllers'

// Peticion que obtiene todos los registros recoletados por el dispositivo
router.route('/historico').get(getTest);

// Conexión Arduino
port.on("open", () => {

    // prueba
    console.log("se abrió la comunicación :v")
})

parser.on("data", (data: any) => {
    console.log("data");

    // Insertar registros

})


export default router;