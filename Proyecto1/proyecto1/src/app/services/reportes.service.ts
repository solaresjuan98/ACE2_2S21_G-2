import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HistorialUso, HistorialPeso } from '../../interfaces/Interfaces';
import { ChartDataSets } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  // Reportes
  getReporteMenorPeso() {

  }

  getReporteMayoruso() {

  }

  

  // Enviar parametro (codigo de usuario)
  getHistorialUso() {
    return this.http.get("http://localhost:3000/historialUso/usuario/1")
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values: HistorialUso[] = Object.values(data);

          return { labels, values }
        })
      )
  }

  getHistorialPeso(){
    return this.http.get("http://localhost:3000/historialPeso/usuario/1")
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values = Object.values(data);

          return { labels, values };
        })
      )
  }

  getDiasdeMasUso(){
    return this.http.get("http://localhost:3000/diasMayorUso/usuario/1")
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values = Object.values(data);


          return { labels, values };

        })
      )
  }

}
