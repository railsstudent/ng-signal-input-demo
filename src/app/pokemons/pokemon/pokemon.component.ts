import { ChangeDetectionStrategy, Component, computed, effect, signal, ɵinput } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonType } from '../types/pokemon.type';
import { getPokemonFn } from '../utils/get-pokemon.util';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonCardComponent],
  template: `
    <p>Pokemon id: {{ id() }}, Next Pokemon id: {{ nextId() }}</p>
    <p [style.background]="bgColor()">Background color: {{ bgColor() }}</p>
    <p>Text: {{ text() }}</p>

    <div class="container">
      @if (pokemon(); as pokemon) {
        <app-pokemon-card [pokemon]="pokemon" />
      }

      @if (nextPokemon(); as pokemon) {
        <app-pokemon-card [pokemon]="pokemon" />
      }
    </div>
    <hr />
`,
  styles: `
    div.container {
      display: flex;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent {
  id = ɵinput.required<number>();
  bgColor = ɵinput<string>('cyan', { alias: 'backgroundColor' });
  text = ɵinput('not working', {
    alias: 'exclaimText',
    transform: (v: string) => `transformed ${v}`,
  });

  nextId = computed(() => this.id() + 1);
  getPokemon = getPokemonFn();

  pokemon = signal<PokemonType | undefined>(undefined);
  nextPokemon = signal<PokemonType | undefined>(undefined);

  constructor() {
    effect((onCleanup) => {
      const subscription = this.getPokemon(this.id()).subscribe((pokemon) => this.pokemon.set(pokemon));
      const subscription2 = this.getPokemon(this.nextId()).subscribe((pokemon) => this.nextPokemon.set(pokemon));
 
      onCleanup(() => {
        subscription.unsubscribe();
        subscription2.unsubscribe();
      });
    });
  }
}
