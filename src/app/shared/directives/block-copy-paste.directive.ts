import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {

  constructor() { }

  @HostListener('paste', ['$event'])
  public blockPaste(e: KeyboardEvent):void {
    console.log("hayop");
    e.preventDefault();
  }

  @HostListener('click')
  public nameF() {
    console.log("ha");
  };

  @HostListener('copy', ['$event'])
  public blockCopy(e: KeyboardEvent):void {
    console.log("hayoc");
    e.preventDefault();
  }

  @HostListener('cut', ['$event'])
  public blockCut(e: KeyboardEvent):void {
    console.log("hayocut");
    e.preventDefault();
  }

}
