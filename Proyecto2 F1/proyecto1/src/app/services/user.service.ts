import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    constructor(private http:HttpClient) { }

    register({email, password}){
      return this.http.post("http://localhost:3000/usuario", {email, password});
      //return this.http.post(`${environment.API_URI}/usuario`, 
      //{email, password});
    }


    // Obtener id del usuario por su correo
    getIdUsuario(correo: string) {
      return this.http.get(`http://localhost:3000/usuario/${correo}`)
        .pipe(
          map(data => {

            //console.log(data);
            return data
          })
        )

    }
}


