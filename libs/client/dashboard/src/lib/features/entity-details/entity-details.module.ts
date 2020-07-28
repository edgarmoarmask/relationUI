import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from '@angular/material/checkbox';

import {EntityDetailsComponent} from "./containers/entity-details/entity-details.component";
import {DetailOptionComponent} from './components/detail-option/detail-option.component';


@NgModule({
  declarations: [
    EntityDetailsComponent,
    DetailOptionComponent
  ],
  imports: [
    CommonModule,

    MatExpansionModule,
    MatCheckboxModule,
  ],
  exports: [
    EntityDetailsComponent
  ]
})
export class EntityDetailsModule {
}
