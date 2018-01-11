import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[cpDelay]'
})
export class LoopdirectiveDirective {

  constructor(
     private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef
    ) { }
    // @Input('appLoopdirective') set loop(num: number) {

    //   for(let i = 0; i < num; i++) {
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //   }
    // }

    @Input() set cpDelay(delay: number) {
      this.viewContainer.clear();
      setTimeout(() =>
        { 
            this.viewContainer.createEmbeddedView(this.templateRef);
      }, delay);
    }
}
