
import { Router } from 'express';
const router = Router();

// Arduino
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline')
const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));

// no es necesario
import {
    indexWelcome,
    getTest,
    insertData,
    getTiempoTotal,
    getVecesPromedio,
    getTiempoPromedio,
    getUltimoRegistro,
    getHistorialUso
} from '../controllers/index.controllers'

router.route('/').get(getTest);
// Historial de peso de uso del usuario
router.route('/historialPeso/usuario/:id_usuario').get(getTiempoTotal);
// Numero de veces promedio que se levanta el usuario
router.route('/vecesPromedio/usuario/:id_usuario').get(getVecesPromedio);
// Numero de horas promedio que utiliza el usuario la silla
router.route('/horasPromedio/usuario/:id_usuario').get(getTiempoPromedio);
// Ultimo registro
router.route('/ultimoRegistro/usuario/:id_usuario').get(getUltimoRegistro);
// Histrial de uso del usuario
router.route('/historialUso/usuario/:id_usuario').get(getHistorialUso);

// Conexión Arduino
port.on("open", () => {

    // prueba
    /*const objTest = {
        id_usuario: Math.floor(Math.random() * (100 - 10) + 10),
        nombre: "Mario",
        profesion: "Arquitecto"
    }
    insertData(objTest);*/
    console.log("se abrió la comunicación :v")
})
//Variables Globales
var bandera1=true
var bandera2=true
var inicio=""

parser.on("data", (data: any) => {

    let json=JSON.parse(data);
    if(json.sentado&&json.pesoEnKg>0.15){
        console.log("Insertando "+json.pesoEnKg+" Kg");
        if(bandera1){
            var hoy:Date=new Date()
            var fecha=hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate();
            console.log("Fecha:"+fecha);
            var hora=hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
            console.log("Hora:"+hora);
            inicio=fecha+" "+hora
            bandera1=false
        
        }
    }
    // Funcion para guardar data en la bd (con timeout)

})


export default router;