import { NgModule } from '@angular/core';
// import { SlimScrollModule } from 'ng2-slimscroll';

import { PageEditorModule } from './../page-editor/page-editor.module';
import { UiModule } from './../ui/ui.module';
import { SharedModule } from './../shared/shared.module';
import { PlayerComponent } from './player.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule,
    PageEditorModule,
    // SlimScrollModule
  ],
  declarations: [PlayerComponent],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }