import { Component, Renderer2 } from '@angular/core';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
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
  usuario:any;

  constructor(private renderer: Renderer2, private pokemonApi: PokemonApiService,
    private auth:AuthService, private firestore:FirestoreService) {}

  ngOnInit()
  {
    this.pokemonCard = document.querySelector(".pokemon");
    VanillaTilt.init(this.pokemonCard, { max: 20, speed: 400, scale: 1.05});
    this.contenedorTrivia = document.querySelector(".preguntados");
    this.auth.getLoggedUser().subscribe((usuario)=>{
      //@ts-ignore
      this.usuario = usuario.email.split('@')[0];
    });
  }
    
  async ngAfterViewInit()
  {
    this.pokemon = await this.pokemonApi.obtenerPokemon(this.generarNumeroRandom(1, 151));
    this.generarPokemonesRandom();
    this.popup = document.getElementById("popup");
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
      this.pokemon = await this.pokemonApi.obtenerPokemon(idRandom);

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

    this.pokemon = await this.pokemonApi.obtenerPokemon(this.generarNumeroRandom(1, 151));
    await this.generarPokemonesRandom();

    this.contenedorTrivia.classList.add("slide-in-right");
  }

  verificarFinalizacionJuego()
  {
    if(this.desaciertos == 5)
    {
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
        this.firestore.guardarResultadoPreguntados(this.usuario, this.puntos);
    }
  }

  async reiniciarJuego()
  {
    this.popup?.classList.remove("open-popup");
    this.desaciertos = 0;
    this.puntos = 0;
    const numeroRandom = this.generarNumeroRandom(1, 151); 
    this.pokemon = await this.pokemonApi.obtenerPokemon(numeroRandom); 
    this.generarPokemonesRandom();
  }

}
