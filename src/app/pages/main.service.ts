import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Pokemons, { Details, PokemonResponse } from './main/pokemons.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  listPokemons(): Observable<Pokemons[]> {
    return this.http.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon").pipe(
      map(x => x.results));
  }

  listPokemonsDetails(name: string): Observable<Details> {
    return this.http.get<Details>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
