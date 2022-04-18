import { MoreInfoComponent } from './../more-info/more-info.component';
import { Details } from './../pokemons.model';
import { MainService } from './../../main.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import Pokemons from '../pokemons.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public pokemonList: Pokemons[] = [];
  public basePokemonList: Pokemons[];
  public pokemonDetails: Details[] = [];
  public selectedPokemon: Pokemons;
  public search = ''
  public isLoadingPokemons = false;
  public page = 0;

  constructor(
    private mainService: MainService,
    private modalService: NgbModal) {
    this.selectedPokemon = {} as Pokemons;
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.mainService.listPokemons(this.page).subscribe(pokemons => {
      this.pokemonList = pokemons.map(pokemon => ({
        ...pokemon,
        details$: this.mainService.listPokemonsDetails(pokemon.name)
      } as Pokemons))
      this.basePokemonList = [...this.pokemonList]
      this.getTypePokemons();
      this.getAbilitiesPokemons();
      this.getStatsPokemon();
      this.getStatsNumberPokemon();
    })
  }

  getTypePokemons() {
    this.pokemonList.forEach(pokemon => {
      pokemon.types$ = pokemon.details$.pipe(
        map(details => details.types.map(type => type.type.name.replace(/,\s*$/, " ")))
      )
    });
  }

  getAbilitiesPokemons() {
    this.pokemonList.forEach(pokemon => {
      pokemon.abilities$ = pokemon.details$.pipe(
        map(details => details.abilities.map(abilities => abilities.ability.name))
      )
    })
  }

  getStatsPokemon() {
    this.pokemonList.forEach(pokemon => {
      pokemon.stats$ = pokemon.details$.pipe(
        map(details => details.stats.map(stats => stats.stat.name))
      )
    })
  }

  getStatsNumberPokemon() {
    this.pokemonList.forEach(pokemon => {
      pokemon.base_stats$ = pokemon.details$.pipe(
        map(details => details.stats.map(stats => stats.base_stat ))
      )
    })
  }

  openMoreInfoModal(pokemon: Pokemons, content: TemplateRef<MoreInfoComponent>) {
    this.selectedPokemon = pokemon;
    this.modalService.open(content);
  }

  searchPokemon(delay = false) {
    if(delay) {this.isLoadingPokemons = delay}

    const normalize = (value: string) => this.removeAccents(value).toLowerCase();

    const text = this.search;
    this.pokemonList = this.basePokemonList.filter(pokemon => {
      return (normalize(pokemon.name).includes(normalize(text)))
    })
  }

  removeAccents(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
