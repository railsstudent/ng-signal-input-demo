import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injector, computed, effect, inject, signal, ɵinput } from '@angular/core';

type PokemonType = { 
  id: number; 
  name: string;
  sprites: { [key: string]: string };
}

const URL = `https://pokeapi.co/api/v2/pokemon`;

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [],
  template: `
    <p>Pokemon id: {{ id() }}, Next Pokemon id: {{ nextId() }}</p>
    <p>Background color: {{ bgColor() }}</p>
    <p>Text: {{ text() }}</p>

    @if (pokemon(); as pokemon) {
      <p>Pokemon id: {{ pokemon.id }}, name: {{ pokemon.name }}</p>
      <img [src]="pokemon.sprites['front_shiny'] || ''" />
    }

    @if (nextPokemon(); as pokemon) {
      <p>Pokemon id: {{ pokemon.id }}, name: {{ pokemon.name }}</p>
      <img [src]="pokemon.sprites['front_shiny'] || ''" />
    }

    <hr />
`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent {
  id = ɵinput.required<number>();
  bgColor = ɵinput<string>('white', { alias: 'backgroundColor' });
  text = ɵinput('not working', {
    alias: 'exclaimText',
    transform: (v: string) => `transformed ${v}`,
  });

  nextId = computed(() => this.id() + 1);

  httpClient = inject(HttpClient);
  injector = inject(Injector);

  pokemon = signal<PokemonType | undefined>(undefined);
  nextPokemon = signal<PokemonType | undefined>(undefined);

  constructor() {
    effect((onCleanup) => {
      const subscription = this.httpClient.get<PokemonType>(`${URL}/${this.id()}/`)
        .subscribe((pokemon) => this.pokemon.set(pokemon));

      const subscription2 = this.httpClient.get<PokemonType>(`${URL}/${this.nextId()}/`)
        .subscribe((pokemon) => this.nextPokemon.set(pokemon));

      onCleanup(() => {
        subscription.unsubscribe();
        subscription2.unsubscribe();
      });
    });
  }
}
