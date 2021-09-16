import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-mayor-uso',
  templateUrl: './mayor-uso.component.html',
  styles: [
  ]
})
export class MayorUsoComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [/*'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'*/];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [ ], label: 'Series A' }
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
    this.reportesService.getDiasdeMasUso()
    .subscribe(({ labels, values }) => {
      
      this.barChartLabels = labels;
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
