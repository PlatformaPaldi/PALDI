import { StateService } from './core/state.service';
import { SharedModule } from './shared/shared.module';
import { CodeEditorModule } from './code-editor/code-editor.module';
import { PageEditorModule } from './page-editor/page-editor.module';
import { PlayerModule } from './player/player.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    PageEditorModule,
    CodeEditorModule,
    PlayerModule
  ],
  providers: [
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
