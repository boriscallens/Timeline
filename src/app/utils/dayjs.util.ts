import * as dayjs from 'dayjs';
import * as minMax from 'dayjs/plugin/minMax';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

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
