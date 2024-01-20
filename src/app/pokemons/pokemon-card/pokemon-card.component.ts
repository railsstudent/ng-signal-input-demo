import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonType } from '../types/pokemon.type';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  template: `
    <div>
      <p>Pokemon id: {{ pokemon().id }}, name: {{ pokemon().name }}</p>
      <img [src]="pokemon().sprites['front_shiny'] || ''" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  pokemon = input.required<PokemonType>();
}
