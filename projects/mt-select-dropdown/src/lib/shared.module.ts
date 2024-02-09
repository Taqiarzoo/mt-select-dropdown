import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LabelKeyPipe } from './pipes/pipes/labelKey.pipe';



@NgModule({
  declarations: [LabelKeyPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NoopAnimationsModule
  ],
  exports: [FormsModule,
    ReactiveFormsModule, LabelKeyPipe]
})
export class SharedModule { }
