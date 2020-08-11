import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderedBox]'
})
export class BorderedBoxDirective {

  constructor(private elementRef:ElementRef,private renderer2:Renderer2) { 
  }

  @HostListener('mouseenter')
  public addBorder():void{
    this.addBorderHoveredElement();
  }

  @HostListener('mouseleave')
  public removeBorder():void{
    this.removeBorderHoveredElement();
  }

  public addBorderHoveredElement():void{
    this.renderer2.setStyle(this.elementRef.nativeElement,'border','1px solid green');
  }

  public removeBorderHoveredElement():void{
    this.renderer2.setStyle(this.elementRef.nativeElement,'border','');
  }
}
