import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
}


