import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
import { AceEditorDirective, AceEditorComponent } from 'ng2-ace-editor';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AceEditorComponent,
    AceEditorDirective,
    CodeEditorComponent
  ],
  exports: [CodeEditorComponent]
})
export class CodeEditorModule { }