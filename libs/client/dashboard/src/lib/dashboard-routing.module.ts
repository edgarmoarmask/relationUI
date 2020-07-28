import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainDashboardComponent} from "@dashboard/main/main-dashboard.component";

import {LAYOUT_ROUTE_NAME} from "@dashboard/constants/routes";

import {FoldersComponent} from './pages/folders/folders.component';
import {DesignAccessGuard} from './guards/design-access.guard';


const routes: Routes = [
  {
    path: '', component: MainDashboardComponent, children: [
      {
        path: '', component: FoldersComponent
      },
      {
        path: `:${LAYOUT_ROUTE_NAME}`,
        loadChildren: () => import('@dashboard/pages/layout/layout.module').then(m => m.LayoutModule),
        canLoad: [DesignAccessGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
