import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globales from '../../../globales';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SillaService } from 'src/app/services/silla.service';
import { SillaUsuario } from '../../../interfaces/Interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  correo = '';
  id_usuario = 0;
  url: string = `http://${globales.ip}:${globales.port}`;
  datos:SillaUsuario[] = []
  cont = 1
  usototal = 0
  levantadas = 0
  usopromedio = 0
  horainicio = 0
  tiempo = 0

  constructor(private userService: UserService, private sillaService: SillaService) { }


  ngOnInit(): void {
    /*Se hace la consulta de las ubicaciones y en datos se incerta el contador cont, el cual se debe
    incrementar con cada ubicacion que hay y las ubicaciones*/
    /*Se consulta para saber los datos de las metricas indicadas si ya se ha seleccionado una silla anteriormente*/
    var silla = localStorage.getItem("silla")
    this.correo = localStorage.getItem("correo");
    //console.log(this.correo);
    if (silla != "") {

    }

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

  aceptar() {
    var ubicacion = ((document.getElementById("ubicacion") as HTMLInputElement).value);
    /*Se hace la consulta para saber que silla se está usando, y se llenan los datos de las metricas indicadas
    con las variables que se encuentran arriba xD*/
    if (ubicacion != "") {
      /*let jsonData = { nombre: nombre, ubicacion: ubicacion};
      this.httpClient.post(this.url, jsonData).toPromise().then((data: any) =>{
        localStorage.setItem("silla", data)
      })*/
      alert("Hay que hacer la seleccion de la ubicación xD")
    } else {
      alert("Debe elegir una ubicacion")
    }
  }
}
