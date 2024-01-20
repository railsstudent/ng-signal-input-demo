import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatestWith, interval, map, switchMap, take } from 'rxjs';
import { FontSizeDirective } from '../directives/font-size.directive';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonType } from '../types/pokemon.type';
import { getPokemonFn } from '../utils/get-pokemon.util';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonCardComponent, AsyncPipe],
  hostDirectives: [
    {
      directive: FontSizeDirective,
      inputs: ['size'],
    }
  ],
  template: `
    <p>Pokemon id: {{ id() }}, Next Pokemon id: {{ nextId() }}</p>
    <p [style.background]="bgColor()">Background color: {{ bgColor() }}</p>
    <p>Text: {{ text() }}</p>
    <p>Observable text: {{ value$ | async }}</p>
    <p>Observable counter: {{ counter$ | async }}</p>

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
  id = input.required<number>();
  bgColor = input<string>('cyan', { alias: 'backgroundColor' });
  text = input('not working', {
    alias: 'transformedText',
    transform: (v: string) => `transformed ${v}`,
  });

  nextId = computed(() => this.id() + 1);
  getPokemon = getPokemonFn();

  value$ = toObservable(this.bgColor)
    .pipe(
      combineLatestWith(toObservable(this.text)),
      map(([color, color2]) => `${color}|${color2}`),
      map((color) => `@@${color.toUpperCase()}@@`),
    );

  counter$ = toObservable(this.id).pipe(
    switchMap(
      () => interval(1000).pipe(
        map((v) => v + 1),
        take(this.id())
      ))
  );

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
