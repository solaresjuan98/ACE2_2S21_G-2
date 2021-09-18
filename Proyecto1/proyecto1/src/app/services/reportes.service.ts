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
  getHistorialUso(id_usuario: number) {
    return this.http.get(`http://localhost:3000/historialUso/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values: HistorialUso[] = Object.values(data);
          return { labels, values }
        })
      )
  }

  getHistorialPeso(id_usuario: number) {
    return this.http.get(`http://localhost:3000/historialPeso/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values = Object.values(data);
          return { labels, values };
        })
      )
  }

  getDiasdeMasUso(id_usuario: number) {
    return this.http.get(`http://localhost:3000/maxHorasSeguidas/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values = Object.values(data);
          return { labels, values };

        })
      )
  }
  


  getDiasdeMenosUso(id_usuario: number) {
    return this.http.get(`http://localhost:3000/diasMenorUso/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values = Object.values(data);
          return { labels, values };
        })
      )
  }

  getTotalHoras(id_usuario: number) {

    return this.http.get(`http://localhost:3000/totalHoras/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          return data;
        })
      )

  }

  getHorasPromediodeUso(id_usuario: number) {

    return this.http.get(`http://localhost:3000/horasPromedio/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          return data;
        })
      )

  }

  getHorariodeUso(id_usuario: number) {

    return this.http.get(`http://localhost:3000/horarioUso/usuario/${id_usuario}`)
      .pipe(
        map(data => {
          const labels = Object.keys(data);
          const values = Object.values(data);
          return { labels, values };
        })
      )

  }

  getInfoCruda() {
    return this.http.get(`http://localhost:3000/getInformacionCruda`)
      .pipe(
        map(data => {
         
          return data
        })
      )
  }

}
