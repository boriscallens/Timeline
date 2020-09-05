import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { GullwingComponent } from './gullwing/gullwing.component';
import { PhaseComponent } from './phase/phase.component';

@NgModule({
  declarations: [
    TimelineComponent,
    GullwingComponent,
    PhaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimelineComponent, GullwingComponent
  ]
})
export class TimelineModule { }
