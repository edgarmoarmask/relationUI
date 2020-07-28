import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";

import {GraphRoutingModule} from './graph-routing.module';

import {GraphContainerComponent} from './containers/graph-container/graph-container.component';
import {GraphToolbarComponent} from './components/graph-toolbar/graph-toolbar.component';

@NgModule({
  declarations: [
    GraphContainerComponent,
    GraphToolbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GraphRoutingModule
  ],
})
export class GraphModule {
}
