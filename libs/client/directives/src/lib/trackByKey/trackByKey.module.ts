import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgForTrackByKeyDirective} from './track-by-key.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgForTrackByKeyDirective],
  exports: [NgForTrackByKeyDirective]
})
export class TrackByKeyModule {
}
