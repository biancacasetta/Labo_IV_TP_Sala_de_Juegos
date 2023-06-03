import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  usuarioIngresado:boolean = false;

  constructor(private router:Router,
    private angularFireAuth:AngularFireAuth,
    private firestore:FirestoreService) { }

  async login(email:string, password:string)
  {
    return await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(
        response=>{
          this.firestore.guardarRegistro(email);
          this.usuarioIngresado = true;
          console.log("Login exitoso");

          setTimeout( () => {
            this.router.navigate(['bienvenida']);
          }, 3000);
        })
      .catch(
        error =>{
          if(error.message == "Firebase: Error (auth/wrong-password).")
          {
            console.log("Datos incorrectos");
          }
      });
  }

  logout()
  {
      this.angularFireAuth.signOut();
      this.router.navigate(['acceso']);
      this.usuarioIngresado = false;
      console.log("Logout exitoso");
  }

  async registrar(email:string, password:string)
  {
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.login(email, password);
      })
      .catch(
        error => {
          console.error(error);
        }
      )
  }

  getLoggedUser() {
    return this.angularFireAuth.authState;
  }
}
