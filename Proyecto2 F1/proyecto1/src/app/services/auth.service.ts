import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {
  }

  async onLogin(email:string, pass:string){
    const result = await this.auth.signInWithEmailAndPassword(email,pass);
    return result;
  }

  register(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  
  loginWithGoogle() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    return this.auth.signOut();
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }
}
