import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import {MapRoutingModule} from './map-routing.module';

import {MapContainerComponent} from './containers/map-container/map-container.component';

@NgModule({
  declarations: [
    MapContainerComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule.forRoot(),
    MapRoutingModule
  ]
})
export class MapModule {}
