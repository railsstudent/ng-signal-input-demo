import { ChangeDetectionStrategy, Component, assertInInjectionContext, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

function setTitle() {
  assertInInjectionContext(setTitle);

  const title = inject(Title);
  title.setTitle('Ng Signal Input Demo');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `test`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    setTitle();
  }
}
