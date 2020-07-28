import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from "@angular/material/expansion";

import {EntitiesModule} from "@dashboard/features/entities/entities.module";
import {EntityDetailsModule} from "@dashboard/features/entity-details/entity-details.module";
import {DocumentsModule} from "@dashboard/features/documents/documents.module";

import {LayoutRoutingModule} from './layout-routing.module';

import {LayoutComponent} from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,

    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,

    EntitiesModule,
    EntityDetailsModule,
    DocumentsModule,

    LayoutRoutingModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
}
