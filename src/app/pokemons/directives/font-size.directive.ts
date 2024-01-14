import { Directive, HostBinding, Input, computed, effect, signal, ɵinput } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: true
})
export class FontSizeDirective {
  size = signal(14);
  fontWeight = signal('normal');
  fontStyle = signal('normal');

  set _size(value: number) {
    console.log('fontSizeDirective, set new value ', value)
    this.size.set(value);
  }

  @HostBinding('style.font-size.px')
  @Input({ alias: 'size' })
  get _size() {
    console.log('fontSizeDirective, get value ', this.size());
    return this.size();
  }

  // does not work for me
  // @HostBinding('style.font-size.px')
  // size = ɵinput(14);

  @HostBinding('style.font-weight')
  get _fontWeight() {
    console.log('fontSizeDirective, get fontWeight ', this.fontWeight());
    return this.fontWeight();
  }
  // computed signal does not work for me
  // fontWeight = computed(() => this.size() > 20 && this.size() <= 36 ? ? 'bold' : 'normal'));

  @HostBinding('style.font-style')
  get _fontStyle() {
    console.log('fontSizeDirective, get fontStyle ', this.fontStyle());
    return this.fontStyle();    
  }
  // computed signal does not work for me
  // fontStyle = computed(() => this.size() > 20 && this.size() <= 36 ? ? 'italic' : 'normal'));
  
  constructor() {
    effect(() => {
      const shouldDoStyling = this.size() > 20 && this.size() <= 36;
      this.fontWeight.set(shouldDoStyling ? 'bold' : 'normal');
      this.fontStyle.set(shouldDoStyling ? 'italic' : 'normal');
    }, { allowSignalWrites: true });
  }
}
