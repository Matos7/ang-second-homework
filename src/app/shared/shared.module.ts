import { BorderedBoxDirective } from './directives/bordered-box.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ToStringPipe } from './pipes/to-string.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    BorderedBoxDirective,
    BlockCopyPasteDirective,
    ToStringPipe
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    LoaderComponent,
    BorderedBoxDirective,
    BlockCopyPasteDirective,
    ReactiveFormsModule,
    ToStringPipe
  ],
  providers: []
})
export class SharedModule {}
