import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {EntityProfileComponent} from './containers/entity-profile.component';

import {ProfileTitleComponent} from './components/profile-title/profile-title.component';
import {ProfileDocumentsComponent} from './components/profile-documents/profile-documents.component';
import {ProfileRelationsComponent} from './components/profile-relations/profile-relations.component';

@NgModule({
  declarations: [
    EntityProfileComponent,
    ProfileTitleComponent,
    ProfileDocumentsComponent,
    ProfileRelationsComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    ScrollingModule
  ]
})
export class EntityProfileModule {
}
