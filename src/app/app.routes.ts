import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pokemons/pidgeotto',
        loadComponent: () => import('./pokemons/pokemon/pokemon.component').then((m) => m.PokemonComponent),
        data: {
            id: 17,
            backgroundColor: 'magenta',
        }
    },
    {
        path: 'pokemons/bulbasaur',
        loadComponent: () => import('./pokemons/pokemon/pokemon.component').then((m) => m.PokemonComponent),
        data: {
            id: 1
        }
    }
];
