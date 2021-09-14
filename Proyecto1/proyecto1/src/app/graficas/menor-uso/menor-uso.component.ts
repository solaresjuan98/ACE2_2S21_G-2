import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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
  public barChartLabels: Label[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 12], label: 'Series A' }
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
  constructor() { }

  ngOnInit(): void {
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
