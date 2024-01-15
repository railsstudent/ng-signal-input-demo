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
            id: 1,
            backgroundColor: 'goldenrod',
            transformedText: 'goldenrod',
        }
    },
    {
        path: 'pokemons/ponyta',
        loadComponent: () => import('./pokemons/pokemon/pokemon.component').then((m) => m.PokemonComponent),
        data: {
            id: 77,
            backgroundColor: 'tomato',
            transformedText: 'tomato',
        }
    }
];
