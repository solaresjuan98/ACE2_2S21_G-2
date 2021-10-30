import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportesService } from 'src/app/services/reportes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mayor-uso',
  templateUrl: './mayor-uso.component.html',
  styles: [
  ]
})
export class MayorUsoComponent implements OnInit {


  correo = '';
  id_usuario = 0;
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
    { data: [], label: 'Tiempo (en horas)' }
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
  constructor(private reportesService: ReportesService, private userService: UserService) { }

  ngOnInit(): void {

    this.correo = localStorage.getItem("correo");

    // Obtener id_usuario
    this.userService.getIdUsuario(this.correo).subscribe(data => {
      this.id_usuario = data[0].id_usuario;
      console.log(this.id_usuario)

      this.reportesService.getDiasdeMasUso(this.id_usuario)
        .subscribe(({ labels, values }) => {
          console.log(labels);
          console.log(values);

          // Formatear las fechas
          for (let i = 0; i < labels.length; i++) {
            let date = new Date(labels[i]);
            let currentMonth = date.getMonth() + 1;

            this.barChartLabels.push(date.getDate() + "/" + currentMonth + "/" + date.getFullYear())
          }

          //this.barChartLabels = labels;
          this.barChartData[0].data = values;

          this.barChartLabels[this.barChartLabels.length] = '';
          this.barChartData[0].data[this.barChartData[0].data.length] = 0;


        })
    });


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
