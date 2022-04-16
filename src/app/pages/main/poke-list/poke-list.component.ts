import { MoreInfoComponent } from './../more-info/more-info.component';
import { Details } from './../pokemons.model';
import { MainService } from './../../main.service';
import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import Pokemons from '../pokemons.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public pokemonList: Pokemons[] = [];
  public pokemonDetails: Details[] = [];
  public selectedPokemon: Pokemons;

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
      this.getTypePokemons();
    })
  }

  getTypePokemons() {
    this.pokemonList.forEach(pokemon => {
      pokemon.types$ = pokemon.details$.pipe(
        map(details => details.types.map(type => type.type.name))
      )
    });
  }

  openMoreInfoModal(pokemon: Pokemons, content: TemplateRef<MoreInfoComponent>) {
    this.selectedPokemon = pokemon;
    this.modalService.open(content);
  }
}
