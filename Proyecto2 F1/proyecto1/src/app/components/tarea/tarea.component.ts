import { Component, OnInit } from '@angular/core';
import { SillaService } from 'src/app/services/silla.service';
import { UserService } from 'src/app/services/user.service';
import { SillaUsuario } from 'src/interfaces/Interfaces';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styles: [
    `
      .navegacion {
        width: 100vw;
      }
      .alcentro {
          display: flex; 
          align-items: center; 
          justify-content: center;
      }
    `
  ]
})
export class TareaComponent implements OnInit {

  correo = '';
  id_usuario: number = 0;
  nombre_tarea = '';
  id_silla: number = 0;
  datos: SillaUsuario[] = [];

  constructor(private userService: UserService, private sillaService: SillaService) { }

  ngOnInit(): void {

    this.correo = localStorage.getItem("correo");

    // Obtener id_usuario
    this.userService.getIdUsuario(this.correo).subscribe(data => {
      this.id_usuario = data[0].id_usuario;

      // Obtener las sillas
      this.sillaService.obtenerSillasporId(this.id_usuario).subscribe(data => {
        this.datos = data;
      })

    });

  }


  registrarTarea() {


  }

}
