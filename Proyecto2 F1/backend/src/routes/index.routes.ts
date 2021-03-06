
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
    getUltimoRegistro,
    getHistorialUso,

    setearSilla,
    insertUsuario,
    getHistorialPeso,
    getDiasMayorUso,
    getDiasMenorUso,
    registrarSilla,
    getMaximoHorasSeguidas,
    getIdUsuario,
    getSillasUsuario,
    getHorasPromedio,
    getTotalHoras,
    getVecesLevantado,
    getHorarioUso,
    getSillaActual,
    getHistorialUsoPorSemana,
    getHistorialUsoPorMesAnio,
    getHistorialUsoPorDiaMesAnio,
    tareasRealizadas,
    tareasRealizadasGrafica,
    tareasRealizadasPorFecha,
    horasPorTarea,
    tarearRealizadasTabla,
    tareasRealizadasPorFechaTabla,
    horasPorTareaTabla,
    registrarTarea
} from '../controllers/index.controllers'

router.route('/').get(getTest);
// Obetemer ID del usuario por correo electronico
router.route('/usuario/:correo_electronico').get(getIdUsuario);

// Historial de peso de uso del usuario
router.route('/historialPeso/usuario/:id_usuario').get(getHistorialPeso);



// Numero de veces promedio que se levanta el usuario
router.route('/vecesPromedio/usuario/:id_usuario').get(getVecesPromedio);

// Ultimo registro
router.route('/ultimoRegistro/usuario/:id_usuario').get(getUltimoRegistro);
// Obtener horas promedio que el usuario pasa sentado
router.route('/horasPromedio/usuario/:id_usuario').get(getHorasPromedio);
// Obtener el total de horas que ha pasado sentado el usuario
router.route('/totalHoras/usuario/:id_usuario').get(getTotalHoras);
// Histrial de uso del usuario
router.route('/historialUso/usuario/:id_usuario').get(getHistorialUso);
// Histrial de uso del usuario por semana
router.route('/historialUso/usuario/:id_usuario/:no_semana').get(getHistorialUsoPorSemana);
// Histrial de uso del usuario por mes y a??o
router.route('/historialUso/usuario/:id_usuario/:no_mes/:no_anio').get(getHistorialUsoPorMesAnio);
// Histrial de uso del usuario por dia mes y a??o
router.route('/historialUso/usuario/:id_usuario/:no_dia/:no_mes/:no_anio').get(getHistorialUsoPorDiaMesAnio);
// Dias de mayor uso de la silla por d??a
router.route('/diasMayorUso/usuario/:id_usuario').get(getDiasMayorUso);
// Dias de mayor uso de la silla por d??a
router.route('/diasMenorUso/usuario/:id_usuario').get(getDiasMenorUso);
// Veces que el usuario se ha levantado durante el dia actual
router.route('/vecesLevantado/usuario/:id_usuario').get(getVecesLevantado);
// Obtener horario que el usuario utiliza la silla 
router.route('/horarioUso/usuario/:id_usuario').get(getHorarioUso);

// Obtener el maximo de horas seguidas que se hizo uso de la silla por d??a
router.route('/maxHorasSeguidas/usuario/:id_usuario').get(getMaximoHorasSeguidas);

// Obtener sillas del usuario por id
router.route('/sillas/usuario/:id_usuario').get(getSillasUsuario);

// Insertar silla
router.route('/registrarSilla').post(registrarSilla);
// Registrar usuario
router.route('/usuario').post(insertUsuario);

router.route('/setSilla/:id_usuario').get(setearSilla);
router.route('/tarea').post(registrarTarea);

// PRODUCTIVIDAD 
router.route('/productividad/tareas/:id_silla').get(tareasRealizadas); // Obtener las tareas que el usuario hizo
router.route('/productividad/tareasRealizadasTabla/:id_silla').get(tarearRealizadasTabla) // Tabla 1 
router.route('/productividad/tareasRealizadasGrafica/:id_silla').get(tareasRealizadasGrafica) // Grafica 1 
router.route('/productividad/tareasPorFechaTabla/:id_silla/:tarea').get(tareasRealizadasPorFechaTabla) // Tabla 2
router.route('/productividad/tareasPorFechaGrafica/:id_silla/:tarea').get(tareasRealizadasPorFecha) // Grafica 2 
router.route('/productividad/horasPorTareaTabla/:id_silla').get(horasPorTareaTabla) // Tabla 3 
router.route('/productividad/horasPorTarea/:id_silla').get(horasPorTarea) // Grafica 3 


// Conexi??n Arduino
port.on("open", () => {

    try {
        console.log("se abri?? la comunicaci??n :v")
    } catch (error) {
        console.log('Error');
    }

    
})
//router.route('/getInformacionCruda').get(parser.on("data", (data: any) => {}));
let dato = ""
router.get('/getInformacionCruda', (req, res) => {
    res.send(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">

    <center><a href="http://localhost:4200/home/" class="btn btn-primary text-light" >Regresar</a></center>
    <br>
   <center>
   <table class="table">
    <center>${dato}</center>
    </table>
   </center>
    
  
    <script type="text/javascript">
function actualizar(){location.reload(true);}
//Funci??n para actualizar cada 5 segundos(3000 milisegundos)
setInterval("actualizar()",1000);
</script>
`)

}

);
//Variables Globales
var bandera1 = true

var inicio = ""
var final = ""
var pesos: any = [];
function Promedio(s: any) {
    let sumatoria = 0.0;
    let cantidaNo = s.length - 1;
    for (let a = 0; a < cantidaNo; a++) {
        sumatoria += s.pop();
    }
    s.pop();
    sumatoria = sumatoria / (cantidaNo)
    return sumatoria
}



parser.on("data", (data: any) => {
    
    let json = JSON.parse(data);
    dato += "<tr ><td class='table-light'>"+data+"</td></tr>"
    //response.write(process.version);
    // console.log(data)

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
            //AQUI ES DONDE SE HACE LA INSERCI??N
            let id_silla = getSillaActual();
            console.log( Promedio(pesos));
            if(id_silla !== -1){
                
                insertData(fecha, inicio, final, Promedio(pesos), id_silla)
            }else {
                console.log('No se pudo ingresar el registro porque no hay silla registrada')
            }

            
            //SAQUENME DE
            inicio = ""
            final = ""

        }
    }
    // Funcion para guardar data en la bd (con timeout)

})


export default router;
