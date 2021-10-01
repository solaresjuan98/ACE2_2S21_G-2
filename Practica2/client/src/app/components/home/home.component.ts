import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ultimoRegistro:any={}
  registros:any =[]
  constructor(private climaService:ClimaService) { }

  ngOnInit(): void {
    this.climaService.getRegistros().toPromise()
    .then((res)=>{
        this.registros = res;
        this.ultimoRegistro = this.registros[6];  
    })
    .catch((error)=>{
      console.log(error)
    })
  }

}
