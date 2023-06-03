import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor() { }

  async obtenerPokemon(id:number)
  {
    try
    {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return await res.json();
    }
    catch(error)
    { 
      console.log(error);
    }
  }
}
