import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ReportesService } from 'src/app/services/reportes.service';
import { UserService } from 'src/app/services/user.service';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-horario-uso',
  templateUrl: './horario-uso.component.html',
  styles: [
  ]
})
export class HorarioUsoComponent implements OnInit {

  correo = '';
  id_usuario = 0;

  public lineChartData: ChartDataSets[] = [
    { data: [/*65, 59, 80, 81, 56, 55, 40*/], label: 'Hora (formato 24h)', yAxisID: 'y-axis-0' },
  ];


  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(255,255,255,0.3)',
          },
          ticks: {
            fontColor: 'black'
          }
        },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     color: 'rgba(0,0,0,0.3)',
        //   },
        //   ticks: {
        //     fontColor: 'white',
        //   }
        // }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'April',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(74,197,154,0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  //public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private userService: UserService, private reportesService: ReportesService) { }

  ngOnInit(): void {

    this.correo = localStorage.getItem("correo");

    // Obtener id_usuario
    this.userService.getIdUsuario(this.correo).subscribe(data => {
      this.id_usuario = data[0].id_usuario;
      console.log(this.id_usuario)

      // Consumir servicio de horario de uso

      this.reportesService.getHorariodeUso(this.id_usuario)
        .subscribe(({ labels, values }) => {
          this.lineChartLabels = labels;
          this.lineChartData[0].data = values;

          this.lineChartLabels[this.lineChartLabels.length] = '';
          this.lineChartData[0].data[this.lineChartData[0].data.length] = 0;
        })

    });

  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }

}
