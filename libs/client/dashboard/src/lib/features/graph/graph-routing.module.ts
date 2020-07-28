import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GraphContainerComponent} from "./containers/graph-container/graph-container.component";


const routes: Routes = [
  {path: '', component: GraphContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {
}
