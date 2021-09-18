import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private reportesService: ReportesService) { }

  ngOnInit(): void {

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




}
