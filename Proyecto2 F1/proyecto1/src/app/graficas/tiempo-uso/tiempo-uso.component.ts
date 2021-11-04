import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { UserService } from 'src/app/services/user.service';
import { HistorialUso } from 'src/interfaces/Interfaces';

@Component({
  selector: 'app-tiempo-uso',
  templateUrl: './tiempo-uso.component.html',
  styles: [
  ]
})
export class TiempoUsoComponent implements OnInit {

  correo = '';
  id_usuario = 0;
  
  public historialUso: HistorialUso[] = [];
  public semanas: number[]=[];
 
  
  constructor(private userService: UserService, private reportesService: ReportesService) { }
  @ViewChild('Semana') semana: ElementRef;
  @ViewChild('Mes') mes: ElementRef;
  @ViewChild('Anio') anio: ElementRef;
  @ViewChild('Fecha') fecha: ElementRef;
  ngOnInit(): void {
    
    for (let a = 1; a < 53; a++){
      this.semanas[a-1]=a;

    }

    this.correo = localStorage.getItem("correo");
    
    // Obtener id_usuario
    this.userService.getIdUsuario(this.correo).subscribe(data => {
      this.id_usuario = data[0].id_usuario;
      console.log(this.id_usuario)

      this.reportesService.getHistorialUso(this.id_usuario)
        .subscribe(({ labels, values }) => {

          console.log(values);
          this.historialUso = [...values];
          
        })

    });

  }

  FiltrarPorSemana(){
    if(this.semana.nativeElement.value==="0"){

      this.userService.getIdUsuario(this.correo).subscribe(data => {
        this.id_usuario = data[0].id_usuario;
        console.log(this.id_usuario)
  
        this.reportesService.getHistorialUso(this.id_usuario)
          .subscribe(({ labels, values }) => {
  
            console.log(values);
            this.historialUso = [...values];
            
          })
  
      });

    }else{
      this.userService.getIdUsuario(this.correo).subscribe(data => {
        this.id_usuario = data[0].id_usuario;
        console.log(this.id_usuario)
  
        this.reportesService.getHistorialUsoPorSemana(this.id_usuario,Number(this.semana.nativeElement.value))
          .subscribe(({ labels, values }) => {
  
            
            this.historialUso = [...values];
            
          })
  
      });
    }
   
    
  }

  FiltrarPorMes(){

    if(this.mes.nativeElement.value==="0"||this.anio.nativeElement.value==="0"){

      this.userService.getIdUsuario(this.correo).subscribe(data => {
        this.id_usuario = data[0].id_usuario;
        console.log(this.id_usuario)
  
        this.reportesService.getHistorialUso(this.id_usuario)
          .subscribe(({ labels, values }) => {
  
            console.log(values);
            this.historialUso = [...values];
            
          })
  
      });

    }else{
      this.userService.getIdUsuario(this.correo).subscribe(data => {
        this.id_usuario = data[0].id_usuario;
        console.log(this.id_usuario)
  
        this.reportesService.getHistorialUsoPorMesAnio(this.id_usuario,Number(this.mes.nativeElement.value),Number(this.anio.nativeElement.value))
          .subscribe(({ labels, values }) => {
  
            
            this.historialUso = [...values];
            
          })
  
      });
    }

  }


  FiltrarPorFecha(){
    if(this.fecha.nativeElement.value===""){

      this.userService.getIdUsuario(this.correo).subscribe(data => {
        this.id_usuario = data[0].id_usuario;
        console.log(this.id_usuario)
  
        this.reportesService.getHistorialUso(this.id_usuario)
          .subscribe(({ labels, values }) => {
  
            console.log(values);
            this.historialUso = [...values];
            
          })
  
      });

    }else{
      var fecha=this.fecha.nativeElement.value.split('-')
      console.log(fecha)

      this.userService.getIdUsuario(this.correo).subscribe(data => {
        this.id_usuario = data[0].id_usuario;
        console.log(this.id_usuario)
  
        this.reportesService.getHistorialUsoPorDiaMesAnio(this.id_usuario,Number(fecha[2]),Number(fecha[1]),Number(fecha[0]))
          .subscribe(({ labels, values }) => {
  
            
            this.historialUso = [...values];
            
          })
  
      });
      
    }
  }




}
