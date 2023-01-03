import dayjs, { Dayjs } from 'dayjs';
import { padStart } from 'lodash-es';
import { TIME_GAP } from './constants';

export const decomposeTime = (time: string) => {
  const standardizedTime = padStart(time, 4, '0');

  const hour = +standardizedTime.slice(0, 2);
  const minute = +standardizedTime.slice(2);

  return { hour, minute };
};

export const mergeTimeIntoDay = (day: Dayjs, time: string) => {
  const { hour, minute } = decomposeTime(time);

  return day.hour(hour).minute(minute);
};

export const splitTimeRangeIntoTimeSlots = (start: Dayjs, end: Dayjs, gap = TIME_GAP) => {
  let _start = start;

  const result = [] as Dayjs[];

  while (_start.isBefore(end)) {
    result.push(_start);

    _start = _start.add(gap, 'minute');
  }

  return result;
};
