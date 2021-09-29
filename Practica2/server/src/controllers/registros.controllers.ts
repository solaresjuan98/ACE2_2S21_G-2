import { Request, Response } from 'express'
import { connect } from '../database'


export function indexWelcome(req: Request, res: Response): Response {

    return res.json('Peticion de prueba');
}

export async function getTest(req: Request, res: Response): Promise<Response> {

    const connection = await connect();
    const info = await connection.query("SELECT * FROM registro_clima");

    return res.json(info[0]);
}
