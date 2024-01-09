import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injector, OnInit, Signal, computed, inject, runInInjectionContext, ɵinput } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

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
    <p>Pokemon id: {{ id() }}</p>
    <p>Next Pokemon id: {{ nextId() }}</p>
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
`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent implements OnInit {
  id = ɵinput.required<number>();
  bgColor = ɵinput<string>('', { alias: 'backgroundColor' });
  text = ɵinput(undefined, {
    alias: 'exclaimText',
    transform: (v: string) => `transformed ${v}`,
  });

  nextId = computed(() => this.id() + 1);

  httpClient = inject(HttpClient);
  injector = inject(Injector);

  pokemon!: Signal<PokemonType | undefined>;
  nextPokemon!: Signal<PokemonType | undefined>;

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      const httpClient = inject(HttpClient);
      this.pokemon =  
        toSignal(httpClient.get<PokemonType>(`${URL}/${this.id()}/`), { initialValue: undefined })
      ;
      this.nextPokemon = 
        toSignal(httpClient.get<PokemonType>(`${URL}/${this.nextId()}/`), { initialValue: undefined });  
    });
  }

}
