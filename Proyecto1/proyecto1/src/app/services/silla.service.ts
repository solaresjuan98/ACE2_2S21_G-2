import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SillaUsuario } from '../../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SillaService {

  constructor(private http: HttpClient) { }


  registrarSilla( nombre_silla: string, ubicacion_silla: string, id_usuario: number ) {
    return this.http.post("http://localhost:3000/registrarSilla", { nombre_silla, ubicacion_silla, id_usuario })
  }

  // Obtener las sillas del usuario por su id
  obtenerSillasporId(id_usuario: number) {

    return this.http.get<SillaUsuario[]>(`http://localhost:3000/sillas/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          return data;
        })
      );

  }
}
