export default interface Pokemons {
    name: string;
    url: string;
}

export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemons[]
  }