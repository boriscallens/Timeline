import { moduleMetadata } from '@storybook/angular';

import { IPhase } from './models/phase.model';
import { IMilestone } from './models/milestone.model';
import { TimelineModule } from './timeline.module';
import { TimelineComponent } from './timeline.component';

export default {
  title: 'Timeline',
  decorators: [
    moduleMetadata({
      imports: [TimelineModule],
    }),
  ],
};

// Watch out! Months are the only datepart that is 0 based :O
export const withText = () => ({
  component: TimelineComponent,
  props: {
    Phases : [
      {name: 'registration', startUTC: Date.UTC(2019, 10, 12), endUTC: Date.UTC(2020, 3, 6)},
      {name: 'decision', startUTC: Date.UTC(2020, 1, 27), endUTC: Date.UTC(2020, 3, 6)},
      {name: 'hidden week', startUTC: Date.UTC(2020, 2, 28), endUTC: Date.UTC(2020, 3, 6)},
    ] as IPhase[],
    Milestones: [
      {name: 'registration start', dateUTC: Date.UTC(2019, 10, 12)},
      {name: 'scheme start', dateUTC: Date.UTC(2019, 10, 12)},
      {name: 'registration extension 1', dateUTC: Date.UTC(2020, 1, 10)},
      {name: 'auction', dateUTC: Date.UTC(2020, 1, 11)},
      {name: 'personal offer', dateUTC: Date.UTC(2020, 1, 28)},
      {name: 'registration extension 2', dateUTC: Date.UTC(2020, 2, 28)}
    ] as IMilestone[]
  },
});
