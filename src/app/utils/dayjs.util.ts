import * as dayjs from 'dayjs';
import * as minMax from 'dayjs/plugin/minMax';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { IMilestone } from '../timeline/milestone.model';
import { IPhase } from '../timeline/phase/phase.model';

/**
 * getRange finds the minimum and maximum days of a set of days and then returns an array of all the days in between these
 */
export const getRange = (days: dayjs.Dayjs[]): dayjs.Dayjs[] => {

  dayjs.extend(minMax);
  dayjs.extend(isSameOrBefore);

  const result: dayjs.Dayjs[] = [];

  let i = dayjs.min(days);
  const end = dayjs.max(days);

  do {
    result.push(i);
    i = i.add(1, 'day');
  } while (i.isSameOrBefore(end));

  return result;
};

/**
 * getX finds where on the axis a given date falls in a set range of dates
 */
export const getX = (day: dayjs.Dayjs, days: dayjs.Dayjs[], maximumX: number): number => {

  dayjs.extend(minMax);

  const minDay = dayjs.min(days);
  const maxDay = dayjs.max(days);
  const numberOfDays = maxDay.diff(minDay, 'day');

  const ratio = maximumX / numberOfDays;
  const nthDay = day.diff(minDay, 'day');
  return ratio * nthDay;
};

export class DateRange {
  days: dayjs.Dayjs[];
  numberOfDays: number;

  firstDay: dayjs.Dayjs;
  lastDay: dayjs.Dayjs;

  width: number;
  unitesPerDay: number;

  constructor(milestones: IMilestone[], phases: IPhase[], width: number) {
    dayjs.extend(minMax);

    const dates = milestones
      .map(m => m.dateUTC)
      .concat(phases.flatMap(p => [p.startUTC, p.endUTC]))
      .map(dateUTC => dayjs(dateUTC));

    this.days = getRange(dates);
    this.firstDay = dayjs.min(this.days);
    this.lastDay = dayjs.max(this.days);
    this.width = width;
    this.unitesPerDay = this.width / this.days.length;
  }

  /**
   * getX finds where on the range a given date falls expressed in the unit of width
   */
  public getX(day: dayjs.Dayjs): number{
    const nthDay = day.diff(this.firstDay, 'day');
    return this.unitesPerDay * nthDay;
  }

  public getXUTC(dateUtc: number): number{
    const day = dayjs(dateUtc);
    return this.getX(day);
  }
}
