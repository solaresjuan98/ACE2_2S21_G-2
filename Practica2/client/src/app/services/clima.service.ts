import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  API_URI = 'http://localhost:3000/registros'

  constructor(private http: HttpClient) { }

  public getRegistros(){
    return this.http.get(`${this.API_URI}/historico`)
  }
}
