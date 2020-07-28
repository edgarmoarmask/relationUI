import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MapContainerComponent} from "./containers/map-container/map-container.component";


const routes: Routes = [
  {path: '', component: MapContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {
}
