import { Component } from '@angular/core';
import { delay } from 'rxjs';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  pokemonCard: any;
  contenedorTrivia: any;
  pokemon: any;
  rutaImagenPokemon: string = "";
  pokemonesBoton: string[] = [];
  pokemonMostrado: string = "";
  puntos = 0;
  desaciertos = 0;
  popup: any;

  ngOnInit()
  {
    this.pokemonCard = document.querySelector(".pokemon");
    VanillaTilt.init(this.pokemonCard, { max: 20, speed: 400, scale: 1.05});
    this.contenedorTrivia = document.querySelector(".preguntados");
  }
    
  async ngAfterViewInit()
  {
    await this.obtenerPokemon(this.generarNumeroRandom(1, 151));
    this.generarPokemonesRandom();
    this.popup = document.getElementById("popup");
  }

  async obtenerPokemon(id:number)
  {
    try
    {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      this.pokemon = await res.json();
    }
    catch(error)
    { 
      console.log(error);
    }
  }

  generarNumeroRandom(minimo:number, maximo:number)
  {
    return Math.floor(Math.random() * (maximo - minimo) + minimo);
  }

  async generarPokemonesRandom()
  {
    this.pokemonesBoton = [];
    this.rutaImagenPokemon = this.pokemon.sprites.other.dream_world.front_default;
    let pokemonesAux = [];
    this.pokemonMostrado = this.pokemon.name;
    pokemonesAux.push(this.pokemonMostrado);
    
    for (let i = 0; i < 3; i++)
    {
      let idRandom = this.generarNumeroRandom(1, 151);
      await this.obtenerPokemon(idRandom);

      if(!pokemonesAux.includes(this.pokemon.name))
      {
        pokemonesAux.push(this.pokemon.name);
      }
      else
      {
        i--;
      }
    }

    this.mezclarPokemones(pokemonesAux);
    this.pokemonesBoton = pokemonesAux;
  }

  mezclarPokemones(array: string[])
  {
    const comparador = () => Math.random() - 0.5;
    array.sort(comparador);
  }

  async verificarRespuesta(pokemon:string)
  {
    this.contenedorTrivia.classList.remove("slide-out-left");
    this.contenedorTrivia.classList.remove("slide-in-right");
    this.pokemonCard.classList.remove("blur");

    if(pokemon == this.pokemonMostrado)
    {
      this.puntos++;
    }
    else
    {
      this.desaciertos++;
    }

    this.verificarFinalizacionJuego();

    this.contenedorTrivia.classList.add("slide-out-left");

    delay(700);

    await this.obtenerPokemon(this.generarNumeroRandom(1, 151));
    await this.generarPokemonesRandom();

    this.pokemonCard.classList.add("blur");
    this.contenedorTrivia.classList.add("slide-in-right");
    
  }

  verificarFinalizacionJuego()
  {
    if(this.desaciertos == 10)
    {
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
    }
  }

  async reiniciarJuego()
  {
    this.popup?.classList.remove("open-popup");
    this.desaciertos = 0;
    this.puntos = 0;
    const numeroRandom = this.generarNumeroRandom(1, 151); 
    await  this.obtenerPokemon(numeroRandom); 
    this.generarPokemonesRandom();
  }

}
