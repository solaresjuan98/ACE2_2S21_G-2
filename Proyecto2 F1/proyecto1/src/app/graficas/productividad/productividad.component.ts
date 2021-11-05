import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
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
  tareas_realizadas: Tarea[] = [];
  tareas_fecha: Tarea[] = [];
  tarea = "";

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
    { data: [], label: 'Frecuencia' }
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

  // DONA
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
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
      let numberArray: any[] = [];

      // Generar tabla 1
      this.productividadService.obtenerTablaTareasRealizadas(this.id_silla)
        .subscribe(data => {
          this.tareas_realizadas = data;
        })

      // Generar el reporte de pie
      this.productividadService.obtenerGraficaTareasRealizadas(this.id_silla)
        .subscribe(({ labels, values }) => {
          this.pieChartLabels = labels;
          this.pieChartData = values;
        })

      // Generar el reporte de dona
      this.productividadService.obtenerHorasPorTarea(this.id_silla)
        .subscribe(({ labels, values }) => {
          this.doughnutChartLabels = labels;
          this.doughnutChartData[0] = values;

          console.log(this.doughnutChartData[0])
          this.doughnutChartData[0].map(number => {
            console.log(number)
            numberArray.push(number);
          })

          this.doughnutChartData = numberArray;
        });
      this.productividadService.obtenerTareas(this.id_silla).subscribe(data => {
        this.tareas = data;
      })
    }

  }


  obtenerVecesPorTarea() {

    //let tarea = (document.getElementById("tarea") as HTMLInputElement).value;
    this.tarea = (document.getElementById("tarea") as HTMLInputElement).value;
    
    if (this.tarea === 'Elegir tarea...') {
      alert('Tarea no valida')
    }
    else {

      // Limpiar grafica antes de obtener los datos 
      this.limpiarGraficaBarras();

      this.productividadService.obtenerGraficaPorTarea(this.id_silla, this.tarea)
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


      this.productividadService.obtenerTablaTareasRealizadasPorFecha(this.id_silla, this.tarea)
        .subscribe(data => {
          this.tareas_fecha = data;
        })
    }

  }


  limpiarGraficaBarras() {
    this.barChartData[0].data = [];
    this.barChartLabels = [];
  }

}
