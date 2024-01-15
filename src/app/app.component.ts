import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { setTitle } from '../title.util';
import { PokemonComponent } from './pokemons/pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonComponent, RouterOutlet, RouterLink, FormsModule],
  template: `
    <div>
      <label for="size">
        <span>Size: </span>
        <input type="number" id="size" name="size" [ngModel]="size()" (ngModelChange)="size.set($event)" min="8" />
      </label>
      <app-pokemon [id]="25" backgroundColor="cyan" transformedText="red" [size]="size()" />
      <app-pokemon [id]="52" backgroundColor="yellow" transformedText="green" [size]="size()" />
    </div>
    <h2>Signal inputs with route data</h2>
    <ul>
      <li><a [routerLink]="['/pokemons/bulbasaur']">bulbasaur</a></li>
      <li><a [routerLink]="['/pokemons/pidgeotto']">pidgeotto</a></li>
      <li><a [routerLink]="['/pokemons/ponyta']">ponyta</a></li>
    </ul>
    <router-outlet />
  `,
  styles: `
    h2, ul {
      margin: 0.5rem;
    }

    ul {
      display: flex;
    }

    ul > li {
      list-style-type: none;
      margin-right: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  size = signal(16);

  constructor() {
    setTitle();
  }
}
