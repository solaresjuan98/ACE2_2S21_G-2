import { Injectable } from '@angular/core';
import Usuario from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Usuario = {
    nombre_usuario: '',
    password: ''
  }

  constructor() { }

  isLoggedUser() {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      return true
    } else {
      return false
    }
  }

  logout() {
    localStorage.setItem('user', null);
  }

  login(name: string, pass: string): boolean {
    if (name === 'admin') {
      if (pass === 'admin') {
        localStorage.setItem('user', JSON.stringify(this.user));
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
