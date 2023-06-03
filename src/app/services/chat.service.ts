import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private angularFirestore: AngularFirestore) { }

  obtenerMensajes() {
    const collection = this.angularFirestore.collection<any>('tp1-chats', (ref) =>
      ref.orderBy('fecha', 'asc').limit(20)
    );
    return collection.valueChanges();
  }

  crearMensaje(mensaje:any)
  {
    this.angularFirestore.collection<any>('tp1-chats').add(mensaje);
  }
}
