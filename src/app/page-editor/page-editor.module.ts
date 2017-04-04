import { UiModule } from './../ui/ui.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { PageEditorComponent } from './page-editor.component';
import { ControlsComponent } from './controls/controls.component';

import { GadgetsModule } from 'app/gadgets/gadgets.module';
import { GadgetService } from "app/gadgets/gadget.service";
import { ItemBarComponent } from './item-bar/item-bar.component';

@NgModule({
  imports: [
    SharedModule,
    UiModule,
    GadgetsModule
  ],
  providers: [
    // GadgetService
  ],
  declarations: [
    PageEditorComponent,
    ControlsComponent,
    ItemBarComponent
  ],
  exports: [
    PageEditorComponent,
    ControlsComponent
  ]
})
export class PageEditorModule { }