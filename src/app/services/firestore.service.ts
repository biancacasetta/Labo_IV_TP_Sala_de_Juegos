import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  user: any;

  constructor(private firestore: Firestore) { }

  guardarRegistro(email:string)
  {
    const registros = collection(this.firestore, "tp1-registros");
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const registro = { usuario: email, fecha: fecha };
    
    return addDoc(registros, registro);
  }
}
