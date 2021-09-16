
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
    getVecesPromedio,
    getTiempoPromedio,
    getUltimoRegistro,
    getHistorialUso,
    insertUsuario,
    getHistorialPeso,
    getDiasMayorUso,
    getDiasMenorUso,
    registrarSilla,
    getMaximoHorasSeguidas,
    getIdUsuario,
    getSillasUsuario
} from '../controllers/index.controllers'

router.route('/').get(getTest);
// Obetemer ID del usuario por correo electronico
router.route('/usuario/:correo_electronico').get(getIdUsuario);

// Historial de peso de uso del usuario
router.route('/historialPeso/usuario/:id_usuario').get(getHistorialPeso);
// Numero de veces promedio que se levanta el usuario
router.route('/vecesPromedio/usuario/:id_usuario').get(getVecesPromedio);
// Numero de horas promedio que utiliza el usuario la silla
router.route('/horasPromedio/usuario/:id_usuario').get(getTiempoPromedio);
// Ultimo registro
router.route('/ultimoRegistro/usuario/:id_usuario').get(getUltimoRegistro);
// Histrial de uso del usuario
router.route('/historialUso/usuario/:id_usuario').get(getHistorialUso);
// Dias de mayor uso de la silla por día
router.route('/diasMayorUso/usuario/:id_usuario').get(getDiasMayorUso);
// Dias de mayor uso de la silla por día
router.route('/diasMenorUso/usuario/:id_usuario').get(getDiasMenorUso);
// Obtener el maximo de horas seguidas que se hizo uso de la silla por día
router.route('/maxHorasSeguidas/usuario/:id_usuario').get(getMaximoHorasSeguidas);

// Obtener sillas del usuario por id
router.route('/sillas/usuario/:id_usuario').get(getSillasUsuario);

// Insertar silla
router.route('/registrarSilla').post(registrarSilla);
// Registrar usuario
router.route('/usuario').post(insertUsuario);
// Conexión Arduino
port.on("open", () => {


    console.log("se abrió la comunicación :v")
})
//Variables Globales
var bandera1 = true

var inicio = ""
var final = ""
var pesos:any=[];
function Promedio(s:any) {
    let sumatoria = 0.0;
    let cantidaNo=s.length-1;
    for (let a = 0; a < cantidaNo; a++) {
        sumatoria += s.pop();
    }
    s.pop();
    sumatoria=sumatoria/(cantidaNo)
    return sumatoria
}



parser.on("data", (data: any) => {

    let json = JSON.parse(data);
    if (json.sentado && json.pesoEnKg > 0.15) {
        console.log("Peso: " + json.pesoEnKg + " Kg");
        pesos.unshift(json.pesoEnKg);
        if (bandera1) {
            var hoy: Date = new Date()
            var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
            //console.log("Fecha:" + fecha);
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
            //console.log("Hora:" + hora);
            inicio = fecha + " " + hora
            bandera1 = false


        }
    } else {

        if (!bandera1) {
            var hoy: Date = new Date()
            var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
            //console.log("Fecha:" + fecha);
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
            //console.log("Hora:" + hora);
            final = fecha + " " + hora
            bandera1 = true
            //AQUI ES DONDE SE HACE LA INSERCIÓN
            
           
            insertData(fecha, inicio, final, Promedio(pesos), 1) //1 SE NECESITA VARIABLE GLOBAL DE LA SILLA A UTILIZAR
            inicio = ""
            final = ""
            
        }
    }
    // Funcion para guardar data en la bd (con timeout)

})


export default router;
