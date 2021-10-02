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
  consin1 = ""
  consin2 = ""
  estatus = "Velocidad del viento " + this.velViento + ", Visibilidad " + this.visibilidad + ", " + this.consin1 + " lluvia y " + this.consin2 + " calor."

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
        this.iconoLuz(this.ultimoRegistro.iluminacion);
        this.varStatus();*/
      })
      .catch((error) => {
        console.log(error)
      })
  }

  iconoTemp(temp: string) {
    let t = parseInt(temp, 10)
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

  iconoHumedad(hum: string) {

  }

  iconoVelocidad(vel: string) {

  }

  iconoDireccion(dir: string) {
    if (dir == "N") {
      this.imgDir = "https://i.imgur.com/2lIuYxV.png"
    } else if (dir == "S") {
      this.imgDir = "https://i.imgur.com/8h3Mbes.png"
    } else if (dir == "E") {
      this.imgDir = "https://i.imgur.com/7RrI9ln.png"
    } else { //Oeste
      this.imgDir = "https://i.imgur.com/hPNorAf.png"
    }
  }

  iconoLuz(luz: string) {

  }

  varStatus() {
    this.estatus = "Velocidad del viento " + this.velViento + ", Visibilidad " + this.visibilidad + ", " + this.consin1 + " lluvia y " + this.consin2 + " calor."
  }

}
