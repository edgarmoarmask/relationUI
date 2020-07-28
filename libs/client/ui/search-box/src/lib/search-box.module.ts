import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {SearchBoxComponent} from './search-box.component';

@NgModule({
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    SearchBoxComponent
  ],
  exports: [
    SearchBoxComponent
  ]
})
export class SearchBoxModule {
}
