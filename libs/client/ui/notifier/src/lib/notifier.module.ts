import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ToastrModule} from "ngx-toastr";

import {NotifierService} from "./service/notifier.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot()
  ],
  providers: [
    NotifierService
  ]
})
export class NotifierModule {
}
