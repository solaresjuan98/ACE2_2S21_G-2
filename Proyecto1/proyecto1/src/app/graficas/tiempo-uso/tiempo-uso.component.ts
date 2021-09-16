import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { HistorialUso } from 'src/interfaces/Interfaces';

@Component({
  selector: 'app-tiempo-uso',
  templateUrl: './tiempo-uso.component.html',
  styles: [
  ]
})
export class TiempoUsoComponent implements OnInit {

  public historialUso: HistorialUso[] = [];

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {

    this.reportesService.getHistorialUso()
      .subscribe(({labels, values}) => {

        console.log(values);
        this.historialUso = [...values];
        //this.historialUso.push(values);
      })

      //console.log(this.historialUso);


  }


  

}
