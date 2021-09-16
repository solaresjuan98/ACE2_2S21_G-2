import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globales from '../../../globales';
import { Router } from '@angular/router';

@Component({
  selector: 'app-silla',
  templateUrl: './silla.component.html',
  styleUrls: ['./silla.component.css']
})
export class SillaComponent implements OnInit {

  url: string = `http://${globales.ip}:${globales.port}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  registrarSilla() {
    var nombre = ((document.getElementById("nombresilla") as HTMLInputElement).value);
    var ubicacion = ((document.getElementById("ubicacion") as HTMLInputElement).value);
    if (ubicacion != "") {
      /*let jsonData = { nombre: nombre, ubicacion: ubicacion};
      this.httpClient.post(this.url, jsonData).toPromise().then((data: any) =>{
        alert("¡Se ha registrado la silla!")
        this.router.navigate(['home']);
      })*/
      alert("Hay que hacer el registro de la silla xD")
    } else {
      alert("Debe llenar los campos")
    }
  }
}
