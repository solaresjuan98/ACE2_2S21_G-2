import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductividadService {

  constructor(private http: HttpClient) { }

  

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

}
