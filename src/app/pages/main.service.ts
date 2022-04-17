import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Pokemons, { Details, PokemonResponse } from './main/pokemons.model';
import { PokemonDetail, PokemonList } from './main/pokemon.list';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  listPokemons(): Observable<Pokemons[]> {
    return this.http.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon").pipe(
      map(x => x.results));
  }

  listPokemonsDetails(name: string): Observable<Details> {
    return this.http.get<Details>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemonList(offset: number, limit: number = 20) : Observable<PokemonList[]> {
    return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit)
    .pipe(
        map((x: any) => x.results)
    );
  }

  getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
      return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
  }


}
