import { NgModule }           from '@angular/core';
import { SharedModule }       from '@shared';
import { TrackRoutingModule } from './track-routing.module';
import { TrackListComponent } from './list/list.component';
import { TrackEditComponent } from './edit/edit.component';

const COMPONENTS = [
  TrackListComponent];
const COMPONENTS_NOROUNT = [
  TrackEditComponent];

@NgModule({
  imports: [
    SharedModule,
    TrackRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TrackModule { }
