import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent]
})
export class CodeEditorModule { }