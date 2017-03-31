import { UiModule } from './../ui/ui.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { PageEditorComponent } from './page-editor.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule
  ],
  declarations: [PageEditorComponent],
  exports: [PageEditorComponent]
})
export class PageEditorModule { }