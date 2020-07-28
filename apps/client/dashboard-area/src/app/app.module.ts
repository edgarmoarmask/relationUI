import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import {NgModule} from '@angular/core';

import {DashboardModule} from "@eagleye/client/dashboard";
import {InterceptorErrorModule} from "@eagleye/client/interceptors/error";

import {AppRoutingModule} from "./app.routing.module";

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    DashboardModule,
    InterceptorErrorModule,

    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
