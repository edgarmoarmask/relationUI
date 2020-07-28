import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {SpinnerLoaderComponent} from './spinner-loader.component';

@NgModule({
  declarations: [SpinnerLoaderComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MatProgressSpinnerModule
  ],
  exports: [SpinnerLoaderComponent]
})
export class SpinnerLoaderModule {
}
