import { Component } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  usuario : string = "";
  mensajeNuevo : string = "";
  listaDeMensajes: any = [];

  constructor(private servicioChat: ChatService,
    private auth: AuthService){
      this.servicioChat.obtenerMensajes().subscribe((mensajes:any)=>{
        if(mensajes !== null)
        {
          this.listaDeMensajes = mensajes;          
        }
        setTimeout(()=>{
          this.IrAlUltimoMensaje();
        },100);
      });
  }
  
  ngOnInit() {
  this.auth.getLoggedUser().subscribe((usuario)=>{
    //@ts-ignore
    this.usuario = usuario.email.split('@')[0];
  })

  }
  
  IrAlUltimoMensaje() {
    const elementos = document.getElementsByClassName('mensajes');
    const ultimoElemento: any = elementos[elementos.length - 1];
    const contenedorMensajes = document.getElementById('contenedor-mensajes');
    let toppos: any = [];
    if (ultimoElemento != null) {
      toppos = ultimoElemento.offsetTop;
    }
    if (contenedorMensajes != null) {
      contenedorMensajes.scrollTop = toppos;
    }
  }

  enviarMensaje()
  {
    if(this.mensajeNuevo.trim() == ' ')
    {
      console.log("No se pueden enviar mensajes vacios");
    }
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const mensaje ={
      usuario: this.usuario,
      contenido: this.mensajeNuevo,
      fecha: fecha,
    };
    this.servicioChat.crearMensaje(mensaje);
    this.mensajeNuevo = "";
    this.IrAlUltimoMensaje();
  }
}
