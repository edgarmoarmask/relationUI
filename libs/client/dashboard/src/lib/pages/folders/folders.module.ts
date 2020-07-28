import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import {ProgressBarLoaderModule, SpinnerLoaderModule} from "@eagleye/client/ui/loaders";

import {FoldersRoutingModule} from './folders-routing.module';

import {FoldersComponent} from './folders.component';


@NgModule({
  declarations: [
    FoldersComponent
  ],
  imports: [
    CommonModule,

    MatListModule,
    MatIconModule,

    ProgressBarLoaderModule,
    SpinnerLoaderModule,

    FoldersRoutingModule
  ],
  exports: [
    FoldersComponent
  ]
})
export class FoldersModule {
}
