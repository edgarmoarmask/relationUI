import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {ProgressBarLoaderComponent} from './progress-bar-loader.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatProgressBarModule
  ],
  declarations: [ProgressBarLoaderComponent],
  exports: [ProgressBarLoaderComponent]
})
export class ProgressBarLoaderModule {
}
