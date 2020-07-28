import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from '@angular/material/list';

import {FilterContainerComponent} from './containers/filter-container/filter-container.component';


@NgModule({
  declarations: [
    FilterContainerComponent,
  ],
  imports: [
    CommonModule,

    MatCheckboxModule,
    MatListModule,
  ]
})
export class SideFilterModule {
}
