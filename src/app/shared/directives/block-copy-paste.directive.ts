import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {

  constructor() { }

  @HostListener('paste', ['$event'])
  public blockPaste(e: KeyboardEvent):void {
    e.preventDefault();
  }

  @HostListener('copy', ['$event'])
  public blockCopy(e: KeyboardEvent):void {
    e.preventDefault();
  }

  @HostListener('cut', ['$event'])
  public blockCut(e: KeyboardEvent):void {
    e.preventDefault();
  }

}
