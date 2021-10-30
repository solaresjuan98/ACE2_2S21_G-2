
import { Router } from 'express';
const router = Router();

// Arduino
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline')
<<<<<<< HEAD
const port = new SerialPort("COM4", { baudRate: 4800 });
=======
const port = new SerialPort("COM4", { baudRate: 38400 });
>>>>>>> e95ec1cdf7087d7bbc765636ce447fcc7c221bf5
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));


import {
    getTemperaturaPromedio,
    getTemperaturaPromedioGlobal,
    getTest,
    getVelocidadPromedioGlobal,
    getVelocidadVientoPromedio,
    insertData
} from '../controllers/registros.controllers'

// Peticion que obtiene todos los registros recoletados por el dispositivo
router.route('/historico').get(getTest);

// Peticion que obtiene la temperatura promedio por dia
router.route('/temperatura/promedio').get(getTemperaturaPromedio);

// Peticion que obtiene la velocidad del viento promedio por dia
router.route('/velocidadviento/promedio').get(getVelocidadVientoPromedio);

// Peticion que obtiene el promedio de la temperatura global
router.route('/temperatura/promGlobal').get(getTemperaturaPromedioGlobal);

// Peticion que obtiene el promedio de la velocidad del tiempo global
router.route('/velocidadviento/promGlobal').get(getVelocidadPromedioGlobal);

// Conexión Arduino
port.on("open", () => {

    // prueba
    console.log("se abrió la comunicación :v")
    
})

port.on('err',function(err:any){
    console.log(err);
});
parser.on("data", (data: any) => {
<<<<<<< HEAD
    console.log(data);
=======
>>>>>>> e95ec1cdf7087d7bbc765636ce447fcc7c221bf5

    const data_json = JSON.parse(data);
    console.log(data_json );


    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear()+"-"+ (today.getMonth()+1)+ "-"+today.getDate();
    // YYYY-MM-DD
    // Insertar registros
    // 2021-09-29 15:56:32
    
    insertData(date, date+" "+time , data_json["v"],  data_json["h"],  data_json["t"],  data_json["d"],  data_json["l"],data_json["nu"]) ;
})




export default router;