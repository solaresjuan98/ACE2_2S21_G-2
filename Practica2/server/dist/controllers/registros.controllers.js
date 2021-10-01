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
exports.getVelocidadPromedioGlobal = exports.getTemperaturaPromedioGlobal = exports.getVelocidadVientoPromedio = exports.getTemperaturaPromedio = exports.getTest = exports.indexWelcome = void 0;
const database_1 = require("../database");
function indexWelcome(req, res) {
    return res.json('Peticion de prueba');
}
exports.indexWelcome = indexWelcome;
function getTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        const info = yield connection.query("SELECT * FROM registro_clima");
        return res.json(info[0]);
    });
}
exports.getTest = getTest;
// Obtener temperatura promedio (por dia)
function getTemperaturaPromedio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        const info = yield connection.query(`select distinct fecha_registro, round(sum(temperatura) / count(*), 0) as temperatura_promedio
        from registro_clima
        group by fecha_registro`);
        return res.json(info[0]);
    });
}
exports.getTemperaturaPromedio = getTemperaturaPromedio;
// Obtener velocidad del viendo promedio (por dia)
function getVelocidadVientoPromedio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        const info = yield connection.query(`select distinct fecha_registro, round(sum(velocidad_viento) / count(*), 3) as velocidad_viento_promedio
        from registro_clima
        group by fecha_registro`);
        return res.json(info[0]);
    });
}
exports.getVelocidadVientoPromedio = getVelocidadVientoPromedio;
// Obtener la temperatura promedio de forma global
function getTemperaturaPromedioGlobal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        const info = yield connection.query(`select round(sum(temperatura) / count(*), 3) as prom_temperatura_global
        from registro_clima`);
        return res.json(info[0]);
    });
}
exports.getTemperaturaPromedioGlobal = getTemperaturaPromedioGlobal;
// Obtener la velocidad promedio de forma global
function getVelocidadPromedioGlobal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.connect();
        const info = yield connection.query(`select round(sum(velocidad_viento) / count(*), 3) as prom_vel_viento_global
        from registro_clima`);
        return res.json(info[0]);
    });
}
exports.getVelocidadPromedioGlobal = getVelocidadPromedioGlobal;
