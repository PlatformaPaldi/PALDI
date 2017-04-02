import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule { }