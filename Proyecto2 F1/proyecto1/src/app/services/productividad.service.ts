import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tarea } from '../../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductividadService {

  constructor(private http: HttpClient) { }


  obtenerTareas(id_silla: number){
    return this.http.get<Tarea[]>(`http://localhost:3000/productividad/tareas/${id_silla}`)
    .pipe(
      map(data => {
        return data;
      })
    );
  }
  

  obtenerGraficaTareasRealizadas(id_silla: number){
    return this.http.get(`http://localhost:3000/productividad/tareasRealizadasGrafica/${id_silla}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values: number[] = Object.values(data);
          return { labels, values }
        })
      )
  }

  obtenerGraficaPorTarea(id_silla: number, tarea: string) {
    return this.http.get(`http://localhost:3000/productividad/tareasPorFechaGrafica/${id_silla}/${tarea}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values: number[] = Object.values(data);
          return { labels, values }
        })
      )
  }

}
