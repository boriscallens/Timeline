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

  console.log('day', i, end);

  do {
    result.push(i);
    i = i.add(1, 'day');
    console.log('day', i);
  } while (i.isSameOrBefore(end));

  return result;
};
