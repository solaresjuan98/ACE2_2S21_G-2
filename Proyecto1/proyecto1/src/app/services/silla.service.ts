import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SillaService {

  constructor(private http: HttpClient) { }


  registrarSilla({ nombre_silla, ubicacion_silla, id_usuario }) {
    return this.http.post("http://localhost:3000/registrarSilla", { nombre_silla, ubicacion_silla, id_usuario })
  }
}
