import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Pokemons, { Details, PokemonResponse } from './main/pokemons.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  listPokemons(page: number): Observable<Pinto> {
    return this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${((page ?? 1) * 21) - 21}`).pipe(
      map(x => ({data: x.results, size: x.count})));
  }

  listPokemonsDetails(name: string): Observable<Details> {
    return this.http.get<Details>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}

interface Pinto {
  data: Pokemons[];
  size: number;
}
