import { Request, Response } from 'express'
import { connect } from '../database'
import { Usuario } from '../interface/Usuario';


export function indexWelcome(req: Request, res: Response): Response {

    return res.json('Welcome to my API');
}

export async function getTest(req: Request, res: Response): Promise<Response> {

    const connection = await connect();
    const info = await connection.query("SELECT * FROM usuario");

    return res.json(info[0]);
}

export async function insertData(fecha_registro: any, hora_inicio: any, hora_final: any, peso: any, silla: any) {

    const connection = await connect();
    console.log("Insertando...");

    try {
        // await connection.query("INSERT INTO TEST SET ?", [data]);
        // await connection.query("INSERT INTO registro SET ?,?,?,?,?",[fecha_registro,hora_inicio,hora_final,peso,silla]);
        await connection.query("insert into registro(fecha_registro,hora_inicio,hora_final,peso_registrado,id_silla) values('" + String(fecha_registro) + "','" + String(hora_inicio) + "','" + String(hora_final) + "'," + String(peso) + "," + String(silla) + ")");
        console.log("----------------->Insertado!!!");
        connection.end();
    } catch (error) {
        console.error(error);
    }

}

// =======================================


// ==== Historial de peso  ====
export async function getHistorialPeso(req: Request, res: Response) {

    let grafica: any = {
        datos: {}
    }

    const id = req.params.id_usuario;
    //const id_usuario
    const connection = await connect();
    const registroPeso = await connection.query("select r.peso_registrado \
        from registro r \
                join silla s on s.id_silla = r.id_silla \
                join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = ? order by r.fecha_registro", [id])
    //console.log(registroPeso[0]);

    const arr = JSON.stringify(registroPeso[0]);
    const arregloParseado: any[] = JSON.parse(arr);


    for (let i = 0; i < arregloParseado.length; i++) {
        const element = arregloParseado[i];
        let nombreObj = 'registro_peso' + i + 1;
        console.log(element.peso_registrado);
        grafica.datos[nombreObj] = element.peso_registrado;
    }

    //console.log(Object(registroPeso[0]));
    res.json(grafica.datos);

}

// ==== Numero de veces que el usuario se levanta por día en promedio. ====
export async function getVecesPromedio(req: Request, res: Response): Promise<Response> {

    const id = req.params.id_usuario;
    //const id_usuario
    const connection = await connect();
    const arrRespuesta = await connection.query("select distinct date(fecha_registro) as fecha, count(*) as veces_levantado \
    from registro \
            join silla s on s.id_silla = registro.id_silla \
            join usuario u on u.id_usuario = s.id_usuario \
    where s.id_usuario = ? \
    group by date(fecha_registro)", [id]);

    //console.log([arrRespuesta[0]].length);
    const arr = JSON.stringify(arrRespuesta[0]);
    const arregloParseado = JSON.parse(arr);

    let vecesPromedio = 0;

    arregloParseado.map((item: any) => {
        console.log(item.veces_levantado)
        vecesPromedio += item.veces_levantado;
    })
    //return res.json(JSON.parse(arr));

    return res.json({
        veces_promedio: Math.round(vecesPromedio / arregloParseado.length)
    })

}


// ====  Tiempo de uso promedio de la silla por día ====
export async function getTiempoPromedio(req: Request, res: Response): Promise<Response> {

    const id = req.params.id_usuario;
    //const id_usuario
    const connection = await connect();
    const arrRespuesta = await connection.query("select date(fecha_registro) as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas from registro \
        join silla s on s.id_silla = registro.id_silla \
        join usuario u on u.id_usuario = s.id_usuario \
    where  u.id_usuario = ? \
    group by fecha", [id]);

    const arr = JSON.stringify(arrRespuesta[0]);
    const arregloParseado = JSON.parse(arr);

    let horasPromedio = 0;

    arregloParseado.map((item: any) => {

        horasPromedio += parseFloat(item.horas);
    })

    console.log(horasPromedio);

    return res.json({
        horas_promedio: horasPromedio / arregloParseado.length
    })


}

// ==== Obtener ultimo registro del usuario ====
export async function getUltimoRegistro(req: Request, res: Response): Promise<Response> {

    const id = req.params.id_usuario;
    //const id_usuario
    const connection = await connect();
    const arrRespuesta = await connection.query("select * \
    from registro \
            join silla s on s.id_silla = registro.id_silla \
            join usuario u on u.id_usuario = s.id_usuario \
    where u.id_usuario = ? \
    order by hora_final desc \
    limit 1", [id]);

    return res.json(arrRespuesta[0]);
}


// ==== Historial del tiempo de uso de la silla
export async function getHistorialUso(req: Request, res: Response): Promise<Response> {


    const id = req.params.id_usuario;
    //const id_usuario
    const connection = await connect();
    const arrRespuesta = await connection.query("select date(fecha_registro) as fecha, time(hora_inicio) as hora_inicio, time(hora_final) as hora_final \
        from registro \
                join silla s on s.id_silla = registro.id_silla \
                join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = 1 \
        group by fecha, registro.hora_inicio, registro.hora_final order by fecha asc", [id]);

    return res.json(arrRespuesta[0]);
}


// ==== Obtener el dia y el numero de horas (solo falta agrupar por semanas en un where)
export async function getDiasMayorUso(req:Request, res: Response): Promise<Response> {
    
    let grafica: any = {
        datos: {}
    }

    const id = req.params.id_usuario;

    const connection = await connect();
    const arrRespuesta = await connection.query("select date(fecha_registro) as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas from registro \
        join silla s on s.id_silla = registro.id_silla \
        join usuario u on u.id_usuario = s.id_usuario \
    where  u.id_usuario = ? \
    group by fecha order by horas", [id]);

    const arr = JSON.stringify(arrRespuesta[0]);
    const arregloParseado: any[] = JSON.parse(arr);

    for (let i = 0; i < arregloParseado.length; i++) {
        const element = arregloParseado[i];
        //console.log(element.fecha);
        //console.log(element.horas);

        let nombreObj = element.fecha;
        grafica.datos[nombreObj] = element.horas;

    }

    return res.json(grafica.datos);

}



export async function insertUsuario(req: Request, res: Response) {

    const nuevoUsuario: Usuario = req.body;
    const connection = await connect();
    console.log(nuevoUsuario);
    //await connection.query(`insert into usuario values('${req.body.correo}','${req.body.password}');`); 
    await connection.query(`INSERT INTO usuario (correo_usuario, contrasenia) 
        VALUES('${nuevoUsuario.email}','${nuevoUsuario.password}')`);
    res.json({
        message: 'Usuario creado'
    });

    // try {


    // } catch (error) {
    //     res.sendStatus(400);
    // }
}


//
function generarJSON(resultadoColumna: any[]) {



}