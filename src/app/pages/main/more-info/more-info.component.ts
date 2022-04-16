import { Component, Input, OnInit } from '@angular/core';
import Pokemons from '../pokemons.model';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  @Input() pokemon: Pokemons = {} as Pokemons;

  constructor() { }

  ngOnInit(): void {
  }

}
