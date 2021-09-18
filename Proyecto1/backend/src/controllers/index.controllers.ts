import { Request, Response } from 'express'
import { connect } from '../database'
import { Silla } from '../interface/Silla';
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
        veces_promedio: Math.round(vecesPromedio / arregloParseado.length) // se redondea al valor exacto mas cercano
    })

}


// ====  Tiempo de uso promedio de la silla por día ====
/*
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
*/

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
        where u.id_usuario = ? \
        group by fecha, registro.hora_inicio, registro.hora_final order by fecha asc", [id]);

    return res.json(arrRespuesta[0]);
}


// ==== Obtener el dia y el numero de horas [mayor a menor]
export async function getDiasMayorUso(req: Request, res: Response): Promise<Response> {

    let grafica: any = {
        datos: {}
    }

    const id = req.params.id_usuario;

    const connection = await connect();
    const arrRespuesta = await connection.query("select date(fecha_registro) as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas from registro \
        join silla s on s.id_silla = registro.id_silla \
        join usuario u on u.id_usuario = s.id_usuario \
    where  u.id_usuario = ? \
    group by fecha order by horas desc", [id]);

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

// ==== Obtener la media de horas que se sienta el usuario
export async function getHorasPromedio(req: Request, res: Response): Promise<Response> {

    const id = req.params.id_usuario;
    const connection = await connect();
    const arrRespuesta = await connection.query("select round(sum(horas) / count(*), 3) as horas_promedio \
    from ( \
             select fecha_registro as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas \
             from registro \
                    join silla s on s.id_silla = registro.id_silla \
                    join usuario u on u.id_usuario = s.id_usuario \
            where u.id_usuario = ? \
            group by fecha) t1", [id]);

    return res.json(arrRespuesta[0]);

}

// ==== Obtener el total de horas que ha pasado sentado el usuario
export async function getTotalHoras(req: Request, res: Response): Promise<Response> {

    const id = req.params.id_usuario;
    const connection = await connect();
    const arrRespuesta = await connection.query(`
    select sum(t1.horas) as total_horas
    from (
            select fecha_registro as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas
            from registro
                    join silla s on s.id_silla = registro.id_silla
                    join usuario u on u.id_usuario = s.id_usuario
            where u.id_usuario = ${id}
            group by fecha
        ) t1
    `)

    return res.json(arrRespuesta[0]);

}


// ==== Obtener el dia y el numero de horas [mayor a menor]
export async function getDiasMenorUso(req: Request, res: Response): Promise<Response> {
    let grafica: any = {
        datos: {}
    }

    const id = req.params.id_usuario;

    const connection = await connect();
    const arrRespuesta = await connection.query(`
    select fecha_registro as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas
    from registro
             join silla s on s.id_silla = registro.id_silla
             join usuario u on u.id_usuario = s.id_usuario
    where u.id_usuario = ${id}
    group by fecha_registro
    having horas <= (
        select round(sum(horas) / count(*), 3) as horas_promedio
        from (
                 select fecha_registro as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas
                 from registro
                          join silla s on s.id_silla = registro.id_silla
                          join usuario u on u.id_usuario = s.id_usuario
                 where u.id_usuario = ${id}
                 group by fecha) t1
    )
    order by horas desc
    `)
    // const arrRespuesta = await connection.query("select fecha_registro as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas \n \
    // from registro \n \
    //         join silla s on s.id_silla = registro.id_silla \n \
    //         join usuario u on u.id_usuario = s.id_usuario \n \
    // where u.id_usuario = ? \n \
    // group by fecha_registro \n \
    // having horas <= ( \n \
    //     select round(sum(horas) / count(*), 3) as horas_promedio \n \
    //     from ( \n \
    //             select fecha_registro as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas \n \
    //             from registro \n \
    //                     join silla s on s.id_silla = registro.id_silla \n \
    //                     join usuario u on u.id_usuario = s.id_usuario \n \
    //             where u.id_usuario = ? \n \
    //             group by fecha) t1 \n \
    // ) \n \
    // order by horas desc", [id])

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


// ====  Obtener maximo registro de horas seguidas por dia
export async function getMaximoHorasSeguidas(req: Request, res: Response): Promise<Response> {

    let grafica: any = {
        datos: {}
    }

    const id = req.params.id_usuario;

    const connection = await connect();
    const arrRespuesta = await connection.query("select fecha_registro, \
            max(timestampdiff(second, registro.hora_inicio, registro.hora_final) / 3600) as max_horas_seguidas \
        from registro \
            join silla s on s.id_silla = registro.id_silla \
            join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = ? \
        group by fecha_registro order by max_horas_seguidas desc", [id]);

    const arr = JSON.stringify(arrRespuesta[0]);
    const arregloParseado: any[] = JSON.parse(arr);

    for (let i = 0; i < arregloParseado.length; i++) {
        const element = arregloParseado[i];
        //console.log(element.fecha);
        //console.log(element.horas);

        let nombreObj = element.fecha_registro;
        grafica.datos[nombreObj] = element.max_horas_seguidas;

    }
    console.log(grafica);
    return res.json(grafica.datos);


}

// Veces que el usuario se ha levantado durante el dia actual
export async function getVecesLevantado(req: Request, res: Response): Promise<Response> {

    const id = req.params.id_usuario;
    const connection = await connect();
    const arrResponse = await connection.query("select count(*) as veces_levantado_hoy \
        from registro \
                join silla s on registro.id_silla = s.id_silla \
                join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = ? \
        and date(fecha_registro) = date(now())", [id]);

    return res.json(arrResponse[0]);

}


export async function getIdUsuario(req: Request, res: Response) {

    const correo = req.params.correo_electronico;
    const connection = await connect();

    const resp = await connection.query(` select id_usuario
    from usuario
    where correo_usuario = '${correo}'`, [correo])

    return res.json(resp[0]);



}

// ==== Obtener sillas del usuario
export async function getSillasUsuario(req: Request, res: Response) {

    const id = req.params.id_usuario;
    const connection = await connect();

    const resp = await connection.query('select id_silla, nombre_silla, ubicacion_silla \
        from silla \
        where id_usuario = ?', [id])


    const arr = JSON.stringify(resp[0]);
    const arregloParseado: any[] = JSON.parse(arr);

    return res.json(arregloParseado)

}


// ==== INSERTAR USUARIO NUEVO
export async function insertUsuario(req: Request, res: Response) {

    const nuevoUsuario: Usuario = req.body;
    const connection = await connect();
    //console.log(nuevoUsuario);
    //await connection.query(`insert into usuario values('${req.body.correo}','${req.body.password}');`); 
    await connection.query(`INSERT INTO usuario (correo_usuario, contrasenia) 
        VALUES('${nuevoUsuario.email}','${nuevoUsuario.password}')`);
    res.json({
        message: 'Usuario creado'
    });

}

export async function registrarSilla(req: Request, res: Response) {

    const nuevaSilla: Silla = req.body;
    const connection = await connect();

    await connection.query(`INSERT INTO silla (nombre_silla, ubicacion_silla, id_usuario)
            VALUES( '${nuevaSilla.nombre_silla}', '${nuevaSilla.ubicacion_silla}', ${nuevaSilla.id_usuario} )`)

    res.json({
        message: 'Silla registrada'
    })


}


export async function getHorarioUso(req:Request, res: Response): Promise<Response> {
    
    let grafica: any = {
        datos: {}
    }

    const id = req.params.id_usuario;
    const connection = await connect();
    const arrResponse = await connection.query("select concat(hour(registro.hora_inicio), ':', '00 hrs') hora, count(hour(registro.hora_inicio)) veces_utilizado \
        from registro \
            join silla s on s.id_silla = registro.id_silla \
            join usuario u on u.id_usuario = s.id_usuario \
        where u.id_usuario = ? \
        group by hora order by hora", [id]);

    const arr = JSON.stringify(arrResponse[0]);
    const arregloParseado: any[] = JSON.parse(arr);

    for (let i = 0; i < arregloParseado.length; i++) {
        const element = arregloParseado[i];
        //console.log(element.fecha);
        //console.log(element.horas);

        let nombreObj = element.hora;
        grafica.datos[nombreObj] = element.veces_utilizado;

    }

    return res.json(grafica.datos)


}