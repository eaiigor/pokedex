import { MoreInfoComponent } from './../more-info/more-info.component';
import { Details } from './../pokemons.model';
import { MainService } from './../../main.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import Pokemons from '../pokemons.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';


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

  constructor(
    private mainService: MainService,
    private modalService: NgbModal) {
    this.selectedPokemon = {} as Pokemons;
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.mainService.listPokemons().subscribe(pokemons => {
      this.pokemonList = pokemons.map(pokemon => ({
        ...pokemon,
        details$: this.mainService.listPokemonsDetails(pokemon.name)
      } as Pokemons))
      this.basePokemonList = [...this.pokemonList]
      this.getTypePokemons();
    })
  }

  getTypePokemons() {
    this.pokemonList.forEach(pokemon => {
      pokemon.types$ = pokemon.details$.pipe(
        map(details => details.types.map(type => type.type.name.replace(/,\s*$/, " ")))
      )
    });
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
