import { DataService } from './../core/services/data.service';
import { BorderedBoxDirective } from './directives/bordered-box.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    BorderedBoxDirective,
    BlockCopyPasteDirective
  ],
  imports: [
    CommonModule
  ],exports:[
    LoaderComponent,
    BorderedBoxDirective,
    BlockCopyPasteDirective
  ],
  providers:[
    DataService
  ]
})
export class SharedModule { }
