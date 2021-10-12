import { Request, Response } from 'express'
import { connect } from '../database'


export function indexWelcome(req: Request, res: Response): Response {

    return res.json('Peticion de prueba');
}

// Insertar Datos
export async function insertData(fecha_registro: String, hora_registro: any, velocidad_viento: number, humedad: number, temperatura: number, direccion_viento: string, cantidad_luz: number, nublado: number) {
    
    const connection = await connect();
    console.log("Insertando...");

    try {
        await connection.query(`insert into registro_clima(fecha_registro, hora_registro, velocidad_viento, humedad, temperatura, direccion_viento,
            cantidad_luz, nublado) values ( '${fecha_registro}', '${hora_registro}', ${velocidad_viento}, ${humedad}, ${temperatura}, '${direccion_viento}', ${cantidad_luz}, ${nublado} )`);
        console.log("Ya se pudo insertar");
    } catch (error) {
        console.log(error);
    }

}

export async function getTest(req: Request, res: Response): Promise<Response> {

    const connection = await connect();
    const info = await connection.query("SELECT * FROM registro_clima");

    return res.json(info[0]);
}


// Obtener temperatura promedio (por dia)
export async function getTemperaturaPromedio(req: Request, res: Response) {

    const connection = await connect();
    const info = await connection.query(`select distinct fecha_registro, round(sum(temperatura) / count(*), 0) as temperatura_promedio
        from registro_clima
        group by fecha_registro`)

    return res.json(info[0])

}

// Obtener velocidad del viendo promedio (por dia)
export async function getVelocidadVientoPromedio(req:Request, res: Response) {
    
    const connection = await connect();
    const info = await connection.query(`select distinct fecha_registro, round(sum(velocidad_viento) / count(*), 3) as velocidad_viento_promedio
        from registro_clima
        group by fecha_registro`)

    return res.json(info[0])

}

// Obtener la temperatura promedio de forma global
export async function getTemperaturaPromedioGlobal(req:Request, res: Response) {
    
    const connection = await connect();
    const info = await connection.query(`select round(sum(temperatura) / count(*), 3) as prom_temperatura_global
        from registro_clima`)

    return res.json(info[0])

}

// Obtener la velocidad promedio de forma global
export async function getVelocidadPromedioGlobal(req:Request, res: Response) {
    
    const connection = await connect();
    const info = await connection.query(`select round(sum(velocidad_viento) / count(*), 3) as prom_vel_viento_global
        from registro_clima`)

    return res.json(info[0])
    

}



