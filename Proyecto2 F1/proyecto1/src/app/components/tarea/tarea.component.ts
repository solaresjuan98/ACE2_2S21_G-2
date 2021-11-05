import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SillaService } from 'src/app/services/silla.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TareaService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import { SillaUsuario } from 'src/interfaces/Interfaces';
import Swal from 'sweetalert2'

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
  descripcion_tarea: string = '';
  duracion: number = 0;
  fecha_registro: string = '';
  hora_inicio: string = '';
  hora_final: string = '';
  id_usuario: number = 0;
  nombre_tarea = '';
  id_silla: number = 0;
  datos: SillaUsuario[] = [];
  int = Math.trunc;

  constructor(private userService: UserService, private sillaService: SillaService, private tareaService: TareaService,
    private spinnerService: SpinnerService) { }

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
  getFinalTime(time: Date) {
    let horas, minutos;
    if (this.duracion > 60) {
      let h = this.duracion / 60
      horas = time.getHours() + h;
      minutos = this.duracion - h * 60;
      if (minutos + time.getMinutes() > 60) {
        horas = time.getHours() + 1;
        minutos = this.duracion - (60 - time.getMinutes())
      } else {
        minutos += time.getMinutes()
      }
    } else if (this.duracion + time.getMinutes() > 60) {
      horas = time.getHours() + 1;
      minutos = this.duracion - (60 - time.getMinutes())
    } else {
      horas = time.getHours();
      minutos = time.getMinutes() + this.duracion;
    }
    if (this.int(horas) < 10) {
      this.hora_final = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} 0${this.int(horas)}:${this.int(minutos)}:00`
      if (this.int(minutos) < 10) {
        this.hora_final = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} 0${this.int(horas)}:0${this.int(minutos)}:00`
      }
    } else if (this.int(minutos) < 10) {
      this.hora_final = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${this.int(horas)}:0${this.int(minutos)}:00`
    }
    else {
      this.hora_final = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${this.int(horas)}:${this.int(minutos)}:00`
    }

  }

  async getTimes() {
    let time = new Date();
    console.log(time)
    time.getTime();
    this.fecha_registro = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
    this.hora_inicio = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    await this.getFinalTime(time);
    console.log(this.hora_final)
    console.log(this.hora_inicio)
    console.log(this.fecha_registro)
  }
  registrarTarea() {
    try {
      this.getTimes();
      this.spinnerService.getSpinner();
      this.tareaService.insertarTarea(this.id_usuario, this.fecha_registro, this.descripcion_tarea, this.hora_inicio, this.hora_final, this.duracion).toPromise()
        .then((result) => {
          this.spinnerService.stopSpinner();
          Swal.fire('Tarea registrada', `<strong>
         Su tarea fue registrada correctamente
        </strong>`, 'success');
         // location.pathname = 'home/registroTarea';
        })
        .catch((error) => {
          console.log(error)
          Swal.fire('Error de registro', `<strong>
         Ocurrio un error al intentar registrar la tarea <br>
        </strong>`, 'error');
          this.spinnerService.stopSpinner();
        })
    } catch (error) {
      Swal.fire('Error de registro', `<strong>
      Ocurrio un error al intentar registrar la tarea <br>
     </strong>`, 'error');
    }


  }

}
