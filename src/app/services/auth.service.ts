import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router:Router,
    private angularFireAuth:AngularFireAuth,
    private firestore:FirestoreService) { }

  login(email:string, password:string)
  {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(
        response=>{
          this.router.navigate(['bienvenida']);
          this.firestore.guardarRegistro(email);
      })
      .catch(
        error=>{
        console.error(error);
      });
  }

  logout()
  {
      this.angularFireAuth.signOut();
      this.router.navigate(['acceso']);
  }

  registrar(email:string, password:string)
  {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
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
}
