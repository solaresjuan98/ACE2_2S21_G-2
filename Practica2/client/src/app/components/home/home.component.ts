import { Component, OnInit } from '@angular/core';

import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgTemp = "https://i.imgur.com/hbqjLRi.png"
  imgHum = "https://i.imgur.com/2yhMtOL.png"
  imgVel = "https://i.imgur.com/WH5lJAf.png"
  imgDir = "https://i.imgur.com/2lIuYxV.png"
  imgLuz = "https://i.imgur.com/oRF5FoA.png"

  velViento = ""
  visibilidad = ""
  lluviacalor = ""
  estatus = ""

  ultimoRegistro: any = {}
  registros: any = []

  constructor(private climaService: ClimaService) { }

  ngOnInit(): void {
    this.climaService.getRegistros().toPromise()
      .then((res) => {
        this.registros = res;
        this.ultimoRegistro = this.registros[this.registros.length - 1];
        /*this.iconoTemp(this.ultimoRegistro.temperatura);
        this.iconoHumedad(this.ultimoRegistro.humedad);
        this.iconoVelocidad(this.ultimoRegistro.velocidad_viento);
        this.iconoDireccion(this.ultimoRegistro.direccion_viento);
        this.iconoLuz(this.ultimoRegistro.cantidad_luz);
        this.varStatus();*/
      })
      .catch((error) => {
        console.log(error)
      })
  }

  iconoTemp(t: number) {
    if (t < 0) {
      this.imgTemp = "https://i.imgur.com/zKv306G.png"
    } else if (t > 0 && t <= 8) {
      this.imgTemp = "https://i.imgur.com/hbqjLRi.png"
    } else if (t > 8 && t <= 15) {
      this.imgTemp = "https://i.imgur.com/m4Fqc3n.png"
    } else if (t > 15 && t <= 20) {
      this.imgTemp = "https://i.imgur.com/GtUaZkl.png"
    } else if (t > 20 && t <= 25) {
      this.imgTemp = "https://i.imgur.com/Tdv40l9.png"
    } else if (t > 25 && t <= 30) {
      this.imgTemp = "https://i.imgur.com/C7TmXO9.png"
    } else if (t > 30 && t <= 35) {
      this.imgTemp = "https://i.imgur.com/AH1oxLv.png"
    } else {
      this.imgTemp = "https://i.imgur.com/sZXMTEM.png"
    }
  }

  iconoHumedad(h: number) {
    if (h < 15) {
      this.imgHum = "https://i.imgur.com/oRCdtXo.png"
    } else if (h >= 15 && h < 25) {
      this.imgHum = "https://i.imgur.com/1fiVwfN.png"
    } else if (h >= 25 && h < 40) {
      this.imgHum = "https://i.imgur.com/tq2SqLG.png"
    } else if (h >= 40 && h < 60) {
      this.imgHum = "https://i.imgur.com/qadEwn1.png"
    } else {
      this.imgHum = "https://i.imgur.com/2yhMtOL.png"
    }
  }

  iconoVelocidad(v: number) {

  }

  iconoDireccion(d: string) {
    if (d == "Norte") {
      this.imgDir = "https://i.imgur.com/2lIuYxV.png"
    } else if (d == "Sur") {
      this.imgDir = "https://i.imgur.com/8h3Mbes.png"
    } else if (d == "Este") {
      this.imgDir = "https://i.imgur.com/7RrI9ln.png"
    } else if (d == "Oeste") {
      this.imgDir = "https://i.imgur.com/hPNorAf.png"
    }
  }

  iconoLuz(l: number) {
    if (l <= 10) {
      this.imgLuz = "https://i.imgur.com/3VqD9FI.png"
    } else if (l > 10 && l <= 30) {
      this.imgLuz = "https://i.imgur.com/GcH9tOY.png"
    } else if (l > 30 && l <= 50) {
      this.imgLuz = "https://i.imgur.com/ujoBQfY.png"
    } else if (l > 50 && l <= 70) {
      this.imgLuz = "https://i.imgur.com/DgJgaJL.png"
    } else {
      this.imgLuz = "https://i.imgur.com/oRF5FoA.png"
    }
  }

  varStatus() {
    let promediovel: any;
    let promediotemp: any;
    this.climaService.velViento().toPromise().then((res) => {
      let prom: any = res;
      promediovel = prom.prom_vel_viento_global;
    })

    this.climaService.tempProm().toPromise().then((res) => {
      let prom: any = res;
      promediotemp = prom.prom_temperatura_global;
    })

    if (this.ultimoRegistro.velocidad_viento > promediovel) {
      this.velViento = "alta"
    } else {
      this.velViento = "normal"
    }

    if (this.ultimoRegistro.cantidad_luz > 50) {
      this.visibilidad = "despejada"
    } else {
      this.visibilidad = "nublada"
    }

    if (this.ultimoRegistro.temperatura >= promediotemp && this.ultimoRegistro.humedad >= 50) {
      this.lluviacalor = "sin calor"
    } else if (this.ultimoRegistro.temperatura < promediotemp && this.ultimoRegistro.humedad >= 50) {
      this.lluviacalor = "con lluvia"
    } else if (this.ultimoRegistro.temperatura >= promediotemp && this.ultimoRegistro.cantidad_luz < 50) {
      this.lluviacalor = "con calor"
    } else {
      this.lluviacalor = "sin lluvia"
    }

    this.estatus = "Velocidad del viento " + this.velViento + ", Visibilidad " + this.visibilidad + ", " + this.lluviacalor + "."
  }

}
