import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  API_URI = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  insertarTarea(id_silla, fecha_registro, descripcion_tarea, hora_inicio, hora_final, tiempo_descanso){
    return this.http.post(`${this.API_URI}/tarea`, 
    {
      id_silla, fecha_registro, descripcion_tarea, hora_inicio, hora_final, tiempo_descanso
    });
  }
}
