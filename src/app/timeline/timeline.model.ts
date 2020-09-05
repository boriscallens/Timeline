import { IMilestone } from './milestone.model';
import { IAxis } from './axis.model';
import * as dayjs from 'dayjs';
import { DateRange } from '../utils/dayjs.util';
import { IPhase } from './phase/phase.model';

export class Timeline {
    axis: IAxis;

    dayTicks: ITick[];
    milestoneTicks: (ITick & IMilestone)[];

    constructor(
        private milestones: IMilestone[],
        private phases: IPhase[],
        private width: number = 954,
        private height: number = 100) {

        const range = new DateRange(this.milestones, this.phases, this.width);
        this.dayTicks = this.getDayTicks(range, [1, 5, 10, 15, 20, 25]);
        this.milestoneTicks = this.milestones.map(milestone => this.getMilestoneTick(milestone, range)).slice(0, 1);

        this.axis = {
            x1: 0,
            y1: height / 2,
            x2: width,
            y2: height / 2,
        } as IAxis;
    }

    public getDayTicks(range: DateRange, filter: number[]): ITick[] {
        const filteredDays = range.days.filter(d => filter.includes(d.date()));
        return filteredDays.map<ITick>(d => this.getDayTick(d, range));
    }
    public getDayTick(day: dayjs.Dayjs, range: DateRange): ITick {
        return {
            label: day.format('DD'),
            x: range.getX(day),
            transform: `translate(${range.getX(day)}, ${this.height / 2})`
        } as ITick;
    }
    public getMilestoneTick(milestone: IMilestone, range: DateRange): ITick & IMilestone {
        const tick = {
            label: milestone.name,
            transform: `translate(${range.getXUTC(milestone.dateUTC)}, ${0})`
            // transform: `translate(${range.getXUTC(milestone.dateUTC)}, ${0})`
        } as ITick;
        return {... milestone, ... tick} as ITick & IMilestone;
    }

    public getTextWidth(): number {
        return 100;
    }
}

export interface ITick {
    label: string;
    x: number;
    transform: string;
}
