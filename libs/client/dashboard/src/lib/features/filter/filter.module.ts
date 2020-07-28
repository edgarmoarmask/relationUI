import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxChartsModule} from "@swimlane/ngx-charts";

import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {FilterContainerComponent} from './containers/filter-container/filter-container.component';
import {FilterChartComponent} from "./components/filter-chart/filter-chart.component";
import {FilterToolbarComponent} from './components/filter-toolbar/filter-toolbar.component';

@NgModule({
  declarations: [
    FilterContainerComponent,
    FilterChartComponent,
    FilterToolbarComponent,
  ],
  imports: [
    CommonModule,

    NgxChartsModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class FilterModule {
}
