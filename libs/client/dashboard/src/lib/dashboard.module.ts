import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {enableAkitaProdMode} from '@datorama/akita';

import {environment} from '@eagleye/client/environments';
import {InterceptorErrorModule} from "@eagleye/client/interceptors/error";


import {FoldersModule} from './pages/folders/folders.module';

import {DashboardRoutingModule} from "./dashboard-routing.module";

import {DesignAccessGuard} from "./guards/design-access.guard";

import {MainDashboardComponent} from './main/main-dashboard.component';


if (environment.production) {
  enableAkitaProdMode();
}


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,

    environment.production ? [] : AkitaNgDevtools,

    InterceptorErrorModule,

    FoldersModule,
    DashboardRoutingModule,
  ],
  declarations: [
    MainDashboardComponent
  ],
  providers: [
    DesignAccessGuard
  ],
  exports: [
    MainDashboardComponent
  ]
})
export class DashboardModule {
}
