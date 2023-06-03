import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  resultado:string = "";
  imagenResultado:string = "";
  popup:any;
  main: any;
  
  constructor(private auth:AuthService){}

  ngAfterViewInit()
  {
    this.popup = document.getElementById("popup");
  }

  ngOnInit()
  {
    this.main = document.querySelector(".main");
  }

  slideLeft()
  {
    this.main.classList.add("right-panel-active");
  }

  slideRight()
  {
    this.main.classList.remove("right-panel-active");
  }

  mostrarMensajeLogin()
  {
    if(this.auth.usuarioIngresado)
    {
      this.resultado = '¡Login exitoso!';
      this.imagenResultado = "../../../assets/check.png";
    }
    else{
      this.resultado = 'Datos incorrectos';
      this.imagenResultado = "../../../assets/cross.png";
    }
    this.popup.classList.add("open-popup");
  
    setTimeout(() => {
      this.popup.classList.remove("open-popup");
    }, 1500);
  }

  mostrarMensajeRegistro()
  {
    if(this.auth.usuarioIngresado)
    {
      this.resultado = '¡Registro exitoso!';
      this.imagenResultado = "../../../assets/check.png";
    }
    else
    {
      this.resultado = 'Ya está registrado o Las contraseñas no coinciden';
      this.imagenResultado = "../../../assets/cross.png";
    }
    this.popup.classList.add("open-popup");
  
    setTimeout(() => {
      this.popup.classList.remove("open-popup");
    }, 1500);
  }

}
