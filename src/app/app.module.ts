import { SharedModule } from './shared/shared.module';
import { CodeEditorModule } from './code-editor/code-editor.module';
import { PageEditorModule } from './page-editor/page-editor.module';
import { PlayerModule } from './player/player.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
