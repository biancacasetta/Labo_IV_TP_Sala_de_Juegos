import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  user: any;
  resultados:any;

  constructor(private firestore: Firestore, private angularFirestore:AngularFirestore) { }

  guardarRegistro(email:string)
  {
    const registros = collection(this.firestore, "tp1-registros");
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const registro = { usuario: email, fecha: fecha };
    
    return addDoc(registros, registro);
  }

  guardarResultadoAhorcado(email:string, seGano:boolean)
  {
    const resultadosAhorcado = collection(this.firestore, "tp1-resultados-ahorcado");
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const registro = {
      usuario: email,
      fecha: fecha,
      ganado: seGano };
    
    return addDoc(resultadosAhorcado, registro);
  }

  guardarResultadoMayorOMenor(email:string, puntos:number)
  {
    const resultadosMayorOMenor = collection(this.firestore, "tp1-resultados-mayoromenor");
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const registro = {
      usuario: email,
      fecha: fecha,
      puntaje: puntos };
    
    return addDoc(resultadosMayorOMenor, registro);
  }

  guardarResultadoPreguntados(email:string, puntos:number)
  {
    const resultadosPreguntados = collection(this.firestore, "tp1-resultados-preguntados");
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const registro = {
      usuario: email,
      fecha: fecha,
      puntaje: puntos };
    
    return addDoc(resultadosPreguntados, registro);
  }

  guardarResultadoSudoku(email:string, tiempo:string)
  {
    const resultadosSudoku = collection(this.firestore, "tp1-resultados-sudoku");
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const registro = {
      usuario: email,
      fecha: fecha,
      tiempo: tiempo };
    
    return addDoc(resultadosSudoku, registro);
  }

  obtenerResultadosJuego(juego:string)
  {
    return this.angularFirestore.collection<any>("tp1-resultados-" + juego).valueChanges();
  }
}
