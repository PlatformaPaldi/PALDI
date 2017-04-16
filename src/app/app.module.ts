import { LayoutModule } from './layout/layout.module';
import { SectionService } from 'app/core/section.service';
import { FlowModule } from './flow/flow.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StateService } from './core/state.service';
import { SharedModule } from './shared/shared.module';
import { LogicModule } from './logic/logic.module';
import { PageEditorModule } from './page-editor/page-editor.module';
import { PlayerModule } from './player/player.module';
import { UiModule } from 'app/ui/ui.module';

import { AppComponent } from './app.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    LayoutModule,
    PageEditorModule,
    LogicModule,
    PlayerModule,
    FlowModule,
    UiModule
  ],
  providers: [
    StateService,
    SectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
