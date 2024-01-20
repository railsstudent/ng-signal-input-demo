import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: true,
  host: {
    '[style.font-size.px]': 'size()',
    '[style.font-weight]': 'fontWeight()',
    '[style.font-style]': 'fontStyle()',
    '[style.color]': 'color()',
  }
})
export class FontSizeDirective {
  size = input(14);
  shouldDoStyling = computed(() => this.size() > 20 && this.size() <= 36);
  fontWeight = computed(() => this.shouldDoStyling() ? 'bold' : 'normal');
  fontStyle = computed(() => this.shouldDoStyling() ? 'italic' : 'normal');
  color = computed(() => this.shouldDoStyling() ? 'blue' : 'black');
}
