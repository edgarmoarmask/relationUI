import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {NotifierModule} from "@eagleye/client/ui/notifier";

import {InterceptorErrorService} from "./interceptor-error.service";

@NgModule({
  imports: [
    CommonModule,
    NotifierModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorErrorService,
      multi: true
    }
  ]
})
export class InterceptorErrorModule {
}
