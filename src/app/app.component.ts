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
      <app-pokemon [id]="1" [backgroundColor]="'blue'" [exclaimText]="'red'" />
      <app-pokemon [id]="52" [backgroundColor]="'yellow'" [exclaimText]="'green'" />
    </div>
    <h2>Signal inputs with route data</h2>
    <ul>
      <li><a alt="bulbasaur" [routerLink]="['/pokemons/bulbasaur']">bulbasaur</a></li>
      <li><a alt="pidgeotto" [routerLink]="['/pokemons/pidgeotto']">pidgeotto</a></li>
    </ul>
    <router-outlet />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    setTitle();
  }
}
