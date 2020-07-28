
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";

import {ScrollingModule} from "@angular/cdk/scrolling";

import {SearchBoxModule} from "@eagleye/client/ui/search-box";

import {EntitiesListComponent} from "./containers/entities-list/entities-list.component";


@NgModule({
  declarations: [
    EntitiesListComponent
  ],
  imports: [
    CommonModule,

    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,

    ScrollingModule,

    SearchBoxModule
  ],
  exports: [
    EntitiesListComponent
  ]
})
export class EntitiesModule {
}
