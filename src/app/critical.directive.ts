import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCritical]',
})
export class CriticalDirective {
  constructor(private el: ElementRef) {}

  @Input() set appCritical(condition: boolean) {
    if (condition) {
      this.el.nativeElement.style.color = 'green';
      this.el.nativeElement.style.backgroundColor = '#8fe693';
      this.el.nativeElement.style.padding = '20px';
    } else {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.style.backgroundColor = '#fb7d7d';
      this.el.nativeElement.style.padding = '20px';
    }
  }
}
