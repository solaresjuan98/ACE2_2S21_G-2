import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globales from '../../../globales';
import { Router } from '@angular/router';
import { SillaService } from 'src/app/services/silla.service';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-silla',
  templateUrl: './silla.component.html',
  styleUrls: ['./silla.component.css']
})
export class SillaComponent implements OnInit {

  correo = '';
  id_usuario: number = 0;
  url: string = `http://${globales.ip}:${globales.port}`;


  constructor(private userService: UserService, private sillaService: SillaService) { }

  ngOnInit(): void {
    this.correo = localStorage.getItem("correo");

    // Obtener id_usuario
    this.userService.getIdUsuario(this.correo).subscribe(data => {
      this.id_usuario = data[0].id_usuario;
    });
  }

  registrarSilla() {

    // **OBTENER EL ID DEL USUARIO**

    var nombre_silla = ((document.getElementById("nombresilla") as HTMLInputElement).value);
    var ubicacion_silla = ((document.getElementById("ubicacion") as HTMLInputElement).value);
    if (ubicacion_silla != "") {
  
      this.sillaService.registrarSilla(nombre_silla, ubicacion_silla, this.id_usuario).toPromise()
        .then(() => {

          Swal.fire(
            'Silla registrada',
            '<strong> Su usuario fue registrado correctamente </strong>',
            'success'
          );

        }).catch((error) => {
          console.log(error);
          Swal.fire(
            'Error de registro',
            '<strong>Ocurrió un error al intentar registrar la silla</strong>',
            'error'
          )
        })

    } else {
      alert("Debe llenar los campos")
      Swal.fire(
        'Llena los campos',
        '<strong>Debes llenar todos los campos</strong>',
        'error'
      )
    }
  }
}
