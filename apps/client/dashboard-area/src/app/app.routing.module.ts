import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainDashboardComponent} from "@eagleye/client/dashboard";

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
