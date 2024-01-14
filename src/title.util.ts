import { assertInInjectionContext, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

export function setTitle() {
    assertInInjectionContext(setTitle);

    const title = inject(Title);
    title.setTitle('Ng Signal Input Demo');
}