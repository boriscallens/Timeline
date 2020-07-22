import { Component, OnInit, Input } from '@angular/core';
import { IPhase} from './phase.model';
import { IMilestone} from './milestone.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() Phases: IPhase[] = [];
  @Input() Milestones: IMilestone[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
