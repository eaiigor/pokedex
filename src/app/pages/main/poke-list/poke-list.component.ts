import { Details } from './../pokemons.model';
import { MainService } from './../../main.service';
import { Component, OnInit } from '@angular/core';
import Pokemons from '../pokemons.model';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public pokemonList: Pokemons[] = [];
  public pokemonDetails: Details[] = [];
  public typePokemons: any;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.mainService.listPokemons().subscribe(pokemons => {
      this.pokemonList = pokemons.map(pokemon => ({
        ...pokemon,
        details$: this.mainService.listPokemonsDetails(pokemon.name)
      }as Pokemons))
      this.getTypePokemons();
    })
  }
  
  getTypePokemons() {
    this.pokemonList.forEach(pokemon => {
      pokemon.details$.subscribe(details => {
        this.typePokemons = details.types.map(type => type.type.name);
        this.pokemonDetails.push({
          name: details.name,
          types: this.typePokemons
        } as Details)
        console.log(this.typePokemons)
      })
    })
  }
}
