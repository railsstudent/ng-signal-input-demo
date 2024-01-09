import { ChangeDetectionStrategy, Component, assertInInjectionContext, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PokemonComponent } from './pokemons/pokemon/pokemon.component';

function setTitle() {
  assertInInjectionContext(setTitle);

  const title = inject(Title);
  title.setTitle('Ng Signal Input Demo');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonComponent],
  template: `
    <div>
      <app-pokemon [id]="25" [backgroundColor]="'blue'" [exclaimText]="'red'" />
      <app-pokemon [id]="52" [backgroundColor]="'yellow'" [exclaimText]="'green'" />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    setTitle();
  }
}
