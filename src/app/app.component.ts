import { ChangeDetectionStrategy, Component, assertInInjectionContext, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PokemonComponent } from './pokemons/pokemon/pokemon.component';
import { RouterLink, RouterOutlet } from '@angular/router';

function setTitle() {
  assertInInjectionContext(setTitle);

  const title = inject(Title);
  title.setTitle('Ng Signal Input Demo');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonComponent, RouterOutlet, RouterLink],
  template: `
    <div>
      <app-pokemon [id]="25" backgroundColor="cyan" [exclaimText]="'red'" />
      <app-pokemon [id]="52" backgroundColor="yellow" [exclaimText]="'green'" />
    </div>
    <h2>Signal inputs with route data</h2>
    <ul>
      <li><a [routerLink]="['/pokemons/bulbasaur']">bulbasaur</a></li>
      <li><a [routerLink]="['/pokemons/pidgeotto']">pidgeotto</a></li>
    </ul>
    <router-outlet />
  `,
  styles: `
    h2, ul {
      margin: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    setTitle();
  }
}
