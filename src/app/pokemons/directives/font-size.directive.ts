import { Directive, HostBinding, computed, ɵinput } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: true
})
export class FontSizeDirective {
  @HostBinding('style.font-size.px')
  size = ɵinput(18);

  @HostBinding('style.bold')
  isBold = computed(() => this.size() >  20 && this.size() <= 30);

  @HostBinding('style.bold')
  isItalic = computed(() => this.size() >  30 && this.size() <= 40);
}
