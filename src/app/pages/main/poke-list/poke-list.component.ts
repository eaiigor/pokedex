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
  pokemonsName: any

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.mainService.listPokemons().subscribe(pokemons => {
      this.pokemonList = pokemons;
      console.log(this.pokemonList)
    }, error => {
      console.log('não funcionou essa merda', error)
    })
  }

}
