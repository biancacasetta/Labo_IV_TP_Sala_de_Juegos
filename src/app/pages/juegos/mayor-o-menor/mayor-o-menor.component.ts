import { Component, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css']
})
export class MayorOMenorComponent {

  mazo: any;
  idMazo:string = "";
  cartaRandom: any;
  contenedorMazo: any;
  contenedorCarta: any;
  popup: any;
  puntos = 0;
  desaciertos = 0;
  cartasRestantes = 0;
  rutaImagenCarta = "";
  resultado = "";
  imagenResultado = "";
  usuario:any;

  constructor(private elementRef: ElementRef, private firestore:FirestoreService, private auth:AuthService) {}
  
  async ngOnInit()
  {
    await this.crearMazo();
    await this.obtenerCartaRandom(this.idMazo);
    VanillaTilt.init(
      this.contenedorCarta, { max: 20, speed: 400, scale: 1.05});
    this.cartasRestantes = this.cartaRandom.remaining;
    this.auth.getLoggedUser().subscribe((usuario)=>{
      //@ts-ignore
      this.usuario = usuario.email.split('@')[0];
    });
  }

  ngAfterViewInit()
  {
    this.contenedorMazo = document.querySelector(".mazo");
    this.contenedorCarta = document.querySelector(".carta");
    this.popup = document.getElementById("popup");
  }

  async crearMazo()
  {
    const mazoUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    let res = await fetch(mazoUrl);
    this.mazo = await res.json();
    this.idMazo = this.mazo.deck_id;
  }

  async obtenerCartaRandom(idMazo:string)
  {
    this.contenedorMazo.classList.remove("flip-in-ver-left");
    const cartaUrl = `https://deckofcardsapi.com/api/deck/${idMazo}/draw/?count=1`;
    let res = await fetch(cartaUrl);
    this.cartaRandom = await res.json();
    this.insertarImagenCarta();
    console.log(this.cartaRandom);
  }

  insertarImagenCarta()
  {
    if(this.contenedorMazo)
    {
        this.contenedorMazo.classList.add("flip-in-ver-left");
        this.rutaImagenCarta = `${this.cartaRandom.cards[0].image}`;
    }
  }

  async verificarMayorMenor(eleccion:string)
  {
    let valorCartaActual = this.cartaRandom.cards[0].value;
    await this.obtenerCartaRandom(this.idMazo);
    let valorCartaSiguiente = this.cartaRandom.cards[0].value;

    switch(valorCartaActual)
    {
      case "ACE":
        valorCartaActual = 1;
        break;
      case "JACK":
        valorCartaActual = 11;
        break;
      case "QUEEN":
        valorCartaActual = 12;
        break;
      case "KING":
        valorCartaActual = 13;
        break;
      default:
        valorCartaActual = parseInt(valorCartaActual);
        break;
    }

    switch(valorCartaSiguiente)
    {
      case "ACE":
        valorCartaSiguiente = 1;
        break;
      case "JACK":
        valorCartaSiguiente = 11;
        break;
      case "QUEEN":
        valorCartaSiguiente = 12;
        break;
      case "KING":
        valorCartaSiguiente = 13;
        break;
      default:
        valorCartaSiguiente = parseInt(valorCartaSiguiente);
        break;
    }

    console.log(valorCartaActual);
    console.log(valorCartaSiguiente);

    if(eleccion == "mayor")
    {
      if(valorCartaActual < valorCartaSiguiente)
      {
        this.puntos++;
      }
      else if(valorCartaActual > valorCartaSiguiente)
      {
        this.desaciertos++;
      }
    }
    else if(eleccion == "menor")
    {
      if(valorCartaActual > valorCartaSiguiente)
      {
        this.puntos++;
      }
      else if(valorCartaActual < valorCartaSiguiente)
      {
        this.desaciertos++;
      }
    }

    this.cartasRestantes = this.cartaRandom.remaining;
    this.verificarFinalizacionJuego();
  }

  verificarFinalizacionJuego()
  {
    if(this.desaciertos == 10)
    {
        this.resultado = "¡Ya no tenés más fallos!";
        this.imagenResultado = "../../../../assets/game-over.png";
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
        this.firestore.guardarResultadoMayorOMenor(this.usuario, this.puntos);
    }

    if(this.cartaRandom.remaining == 0)
    {
        this.resultado = "¡Te quedaste sin cartas!";
        this.imagenResultado = "../../../../assets/poker-cards.png";
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
        this.firestore.guardarResultadoMayorOMenor(this.usuario, this.puntos);
    }
  }

  async reiniciarJuego()
  {
    this.popup?.classList.remove("open-popup");
    this.desaciertos = 0;
    this.puntos = 0;
    await this.crearMazo();
    await this.obtenerCartaRandom(this.idMazo);
  }

}
