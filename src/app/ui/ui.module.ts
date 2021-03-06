import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MobileFrameComponent } from './mobile-frame/mobile-frame.component';
import { ScrollDirective } from './scroll/scroll.directive';

import { PaneContentComponent } from './pane/pane-content.component';
import { PaneTitleComponent } from './pane/pane-title.component';
import { PaneToolsComponent } from './pane/pane-tools.component';
import { PaneComponent } from './pane/pane.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MobileFrameComponent,
    PaneComponent,
    PaneTitleComponent,
    PaneToolsComponent,
    PaneContentComponent,
    ScrollDirective,
    ConfirmDialogComponent,
    ToolbarComponent,
    ContactDialogComponent
],
  entryComponents: [
    ConfirmDialogComponent,
    ContactDialogComponent
  ],
  exports: [
    MobileFrameComponent,
    PaneComponent,
    PaneTitleComponent,
    PaneToolsComponent,
    PaneContentComponent,
    ScrollDirective,
    ToolbarComponent
  ]
})
export class UiModule { }