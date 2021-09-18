import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-tiemporeal',
  templateUrl: './tiemporeal.component.html',
  styleUrls: ['./tiemporeal.component.css']
})
export class TiemporealComponent implements OnInit {

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    /*
    this.reportesService.getInfoCruda().subscribe((res:any)=>{
      console.log(res)
    },(err)=>{
      
      console.log(err)
    }
    
    )*/
  
  }

  
  ejecutar(){
    this.reportesService.getInfoCruda().subscribe((res:any)=>{
      console.log(res)
    },(err)=>{
      
      console.log(err)
    }
    
    )
  }

}
