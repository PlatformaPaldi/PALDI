import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ]
})
export class SharedModule { }