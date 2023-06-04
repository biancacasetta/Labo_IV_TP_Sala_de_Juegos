import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  letras: string[] = [];
  palabraSecreta:string = "";
  guionesBajos = "";
  errores = 0;
  letrasSeparadas: string[] = [];
  resultado = "";
  imagenResultado = "";
  popup:any;
  usuario:any;
  
  palabras: string[] = [
    "COMPUTADORA",
    "VIDEOJUEGO",
    "MOUSE",
    "TECLADO",
    "GABINETE",
    "MONITOR"
  ]

  constructor(private firestore:FirestoreService,
    private auth:AuthService) {}

  ngOnInit()
  {
    this.generarBotonesLetras();
    this.palabraSecreta = this.generarPalabraRandom();
    this.generarGuionesPalabra(this.palabraSecreta);
    this.letrasSeparadas = this.palabraSecreta.split("");
    this.popup = document.getElementById("popup");
    this.auth.getLoggedUser().subscribe((usuario)=>{
      //@ts-ignore
      this.usuario = usuario.email.split('@')[0];
    })
  }

  generarBotonesLetras()
  {
    for (let i = 65; i < 91; i++) {

      if(i == 79) // Insertar Ñ antes de que se genere el botón de la O (ASCII = 79)
      {
        this.letras.push("Ñ");
      }

      this.letras.push(String.fromCharCode(i));
    }
  }

  generarPalabraRandom()
  {
    let numeroRandom = Math.floor(Math.random() * this.palabras.length);

    return this.palabras[numeroRandom];
  }

  generarGuionesPalabra(palabra:string)
  {
    for(let i = 0; i < palabra.length; i++)
    {
      this.guionesBajos += "_";
    }
  }

  verificarLetraEnPalabra(letra:string)
  {

    if(this.letrasSeparadas.includes(letra))
    {
      this.letrasSeparadas.forEach((char, index) => {
        if(char == letra)
        {
          this.guionesBajos = this.guionesBajos.substring(0, index) + char + this.guionesBajos.substring(index + 1);
        }
      });

      if(this.guionesBajos.indexOf("_") == -1)
      {
        this.resultado = "¡GANASTE!";
        this.imagenResultado = "../../../../assets/trophy.png";
        this.popup?.classList.add("open-popup");
        this.firestore.guardarResultadoAhorcado(this.usuario, true);
      }
    }
    else
    {
      this.errores++;

      if(this.errores == 6)
      {
        this.resultado = "¡PERDISTE!";
        this.imagenResultado = "../../../../assets/game-over.png";
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
        this.firestore.guardarResultadoAhorcado(this.usuario, false);
        //let botones = document.getElementById("botones");
        //botones?.setAttribute("disabled", "");
      }
    }
  }

  reiniciarJuego()
  {
    this.popup?.classList.remove("open-popup");
    this.errores = 0;
    this.guionesBajos = "";
    this.palabraSecreta = this.generarPalabraRandom();
    this.generarGuionesPalabra(this.palabraSecreta);
    this.letrasSeparadas = this.palabraSecreta.split("");
    console.log(this.palabraSecreta);
  }

}
