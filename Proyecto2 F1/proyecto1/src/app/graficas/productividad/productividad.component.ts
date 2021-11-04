import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { SillaService } from '../../services/silla.service';
import { ProductividadService } from '../../services/productividad.service';
import { SillaUsuario } from 'src/interfaces/Interfaces';
import { UserService } from '../../services/user.service';
import { Tarea } from '../../../interfaces/Interfaces';
@Component({
  selector: 'app-productividad',
  templateUrl: './productividad.component.html',
  styles: [
  ]
})
export class ProductividadComponent implements OnInit {

  correo = '';
  id_usuario = 0;
  datos: SillaUsuario[] = [];
  id_silla = 0;
  tareas: Tarea[] = [];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['-'];
  public pieChartData: number[] = [0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  // BARRAS
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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];

  // DONA
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private userService: UserService, private sillaService: SillaService, private productividadService: ProductividadService) { }

  ngOnInit(): void {

    this.correo = localStorage.getItem('correo');

    // Obtener id_usuario
    this.userService.getIdUsuario(this.correo).subscribe(data => {
      this.id_usuario = data[0].id_usuario;
      console.log(this.id_usuario)

      // Obtener las sillas
      this.sillaService.obtenerSillasporId(this.id_usuario).subscribe(data => {
        this.datos = data;
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

  seleccionarSilla() {

    this.id_silla = parseInt(((document.getElementById("silla") as HTMLInputElement).value));

    if (this.id_silla === 0 || this.id_silla === NaN) {

      alert("Selecciona una silla")
    }
    else {

      // Generar el reporte primero
      this.productividadService.obtenerGraficaTareasRealizadas(this.id_silla)
        .subscribe(({ labels, values }) => {
          this.pieChartLabels = labels;
          this.pieChartData = values;
        })

      this.productividadService.obtenerTareas(this.id_silla).subscribe(data => {
        this.tareas = data;
      })
    }

  }


  obtenerVecesPorTarea() {

    let tarea = (document.getElementById("tarea") as HTMLInputElement).value;

    console.log(tarea);

    if (tarea === 'Elegir tarea...') {
      alert('Tarea no valida')
    }
    else {

      this.productividadService.obtenerGraficaPorTarea(this.id_silla, tarea)
        .subscribe(({ labels, values }) => {
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
    }

  }

}
