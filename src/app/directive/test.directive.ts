import { Directive, HostListener, HostBinding, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective  {

   @HostBinding('class.card-outline-primary') private ishovering: boolean;

  constructor(private elRef: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
      this.changeColor('red');
      this.ishovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
      this.changeColor('white');
      this.ishovering = false;
  }

  private changeColor(color: string) {
     this.elRef.nativeElement.style.color = color;
   }

  

}
