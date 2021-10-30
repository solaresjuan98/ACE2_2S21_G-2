"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUsuario = exports.getHistorialUso = exports.getUltimoRegistro = exports.getTiempoPromedio = exports.getVecesPromedio = exports.getTiempoTotal = exports.insertData = exports.getTest = exports.indexWelcome = void 0;
const database_1 = require("../database");
function indexWelcome(req, res) {
    return res.json('Welcome to my API .l.');
}
exports.indexWelcome = indexWelcome;
function getTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        const info = yield connection.query("SELECT * FROM TEST");
        return res.json(info[0]);
    });
}
exports.getTest = getTest;
function insertData(fecha_registro, hora_inicio, hora_final, peso, silla) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        console.log("Insertando...");
        try {
            // await connection.query("INSERT INTO TEST SET ?", [data]);
            // await connection.query("INSERT INTO registro SET ?,?,?,?,?",[fecha_registro,hora_inicio,hora_final,peso,silla]);
            yield connection.query("insert into registro(fecha_registro,hora_inicio,hora_final,peso_registrado,id_silla) values('" + String(fecha_registro) + "','" + String(hora_inicio) + "','" + String(hora_final) + "'," + String(peso) + "," + String(silla) + ")");
            console.log("----------------->Insertado!!!");
            connection.end();
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.insertData = insertData;
// =======================================
// ==== Tiempo total de horas de uso  ====
function getTiempoTotal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_usuario;
        //const id_usuario
        const connection = yield database_1.connect();
        const registroPeso = yield connection.query("select r.fecha_registro, r.peso_registrado \
        from registro r \
                join silla s on s.id_silla = r.id_silla \
                join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = ?", [id]);
        console.log(registroPeso[0]);
        res.json(registroPeso[0]);
    });
}
exports.getTiempoTotal = getTiempoTotal;
// ==== Numero de veces que el usuario se levanta por día en promedio. ====
function getVecesPromedio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_usuario;
        //const id_usuario
        const connection = yield database_1.connect();
        const arrRespuesta = yield connection.query("select distinct date(fecha_registro) as fecha, count(*) as veces_levantado \
    from registro \
            join silla s on s.id_silla = registro.id_silla \
            join usuario u on u.id_usuario = s.id_usuario \
    where s.id_usuario = ? \
    group by date(fecha_registro)", [id]);
        //console.log([arrRespuesta[0]].length);
        const arr = JSON.stringify(arrRespuesta[0]);
        const arregloParseado = JSON.parse(arr);
        let vecesPromedio = 0;
        arregloParseado.map((item) => {
            console.log(item.veces_levantado);
            vecesPromedio += item.veces_levantado;
        });
        //return res.json(JSON.parse(arr));
        return res.json({
            veces_promedio: Math.round(vecesPromedio / arregloParseado.length)
        });
    });
}
exports.getVecesPromedio = getVecesPromedio;
// ====  Tiempo de uso promedio de la silla por día ====
function getTiempoPromedio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_usuario;
        //const id_usuario
        const connection = yield database_1.connect();
        const arrRespuesta = yield connection.query("select date(fecha_registro) as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas from registro \
        join silla s on s.id_silla = registro.id_silla \
        join usuario u on u.id_usuario = s.id_usuario \
    where  u.id_usuario = ? \
    group by fecha", [id]);
        const arr = JSON.stringify(arrRespuesta[0]);
        const arregloParseado = JSON.parse(arr);
        let horasPromedio = 0;
        arregloParseado.map((item) => {
            horasPromedio += parseFloat(item.horas);
        });
        console.log(horasPromedio);
        return res.json({
            horas_promedio: horasPromedio / arregloParseado.length
        });
    });
}
exports.getTiempoPromedio = getTiempoPromedio;
// ==== Obtener ultimo registro del usuario ====
function getUltimoRegistro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_usuario;
        //const id_usuario
        const connection = yield database_1.connect();
        const arrRespuesta = yield connection.query("select * \
    from registro \
            join silla s on s.id_silla = registro.id_silla \
            join usuario u on u.id_usuario = s.id_usuario \
    where u.id_usuario = ? \
    order by hora_final desc \
    limit 1", [id]);
        return res.json(arrRespuesta[0]);
    });
}
exports.getUltimoRegistro = getUltimoRegistro;
// ==== Historial del tiempo de uso de la silla
function getHistorialUso(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_usuario;
        //const id_usuario
        const connection = yield database_1.connect();
        const arrRespuesta = yield connection.query("select date(fecha_registro) as fecha, time(hora_inicio) as hora_inicio, time(hora_final) as hora_final \
        from registro \
                join silla s on s.id_silla = registro.id_silla \
                join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = 1 \
        group by fecha, registro.hora_inicio, registro.hora_final", [id]);
        return res.json(arrRespuesta[0]);
    });
}
exports.getHistorialUso = getHistorialUso;
function insertUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield database_1.connect();
            yield connection.query(`insert into usuario values(null, '${req.body.correo}','${req.body.password}');`);
            res.send("Usuario creado");
        }
        catch (error) {
            res.sendStatus(400);
        }
    });
}
exports.insertUsuario = insertUsuario;
