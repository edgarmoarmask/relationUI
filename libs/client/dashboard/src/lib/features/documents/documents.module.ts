import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

import {DocumentsContainerComponent} from './containers/documents-container/documents-container.component';
import {DocumentComponent} from './components/document/document.component';

@NgModule({
  declarations: [
    DocumentsContainerComponent,
    DocumentComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    DocumentsContainerComponent
  ]
})
export class DocumentsModule {
}
