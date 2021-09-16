import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-menor-uso',
  templateUrl: './menor-uso.component.html',
  styles: [
    `
    .navegacion {
      width: 100vw;
    }
    `
  ]
})
export class MenorUsoComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    // scales: { xAxes: [{}], yAxes: [{}] },
    // plugins: {
    //   datalabels: {
    //     anchor: 'end',
    //     align: 'end',
    //   }
    // }
  };
  public barChartLabels: Label[] = [/*'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'*/];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 12], label: 'Tiempo (en horas)' }
  ];

  public colors: Color[] = [
    {
      backgroundColor: [
        '#0075ED',
        '#0075ED',
        '#0075ED',
        '#0075ED',
        '#0075ED',
        '#0075ED',
        '#0075ED'
      ]
    }
  ]
  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {

    this.reportesService.getDiasdeMenosUso()
    .subscribe(({ labels, values }) => {
      
      // Formatear las fechas
      for (let i = 0; i < labels.length; i++) {
        let date = new Date(labels[i]);
        let currentMonth = date.getMonth()+1;

        this.barChartLabels.push(date.getDate()+"/"+currentMonth+"/"+date.getFullYear())
      }

      //this.barChartLabels = labels;
      this.barChartData[0].data = values;

      this.barChartLabels[this.barChartLabels.length] = '';
      this.barChartData[0].data[this.barChartData[0].data.length] = 0;


    })

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
    ]
  }

}
