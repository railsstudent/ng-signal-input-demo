import { Directive, HostBinding, computed, ɵinput } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: true
})
export class FontSizeDirective {
  @HostBinding('style.font-size.px')
  size = ɵinput(18);

  @HostBinding('style.bold')
  isBold = computed(() => this.size() >  20);
}
