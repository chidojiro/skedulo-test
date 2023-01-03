import { Children } from '@/common/types';
import { createContext, trimTime } from '@/common/utils';
import dayjs, { Dayjs } from 'dayjs';
import { range } from 'lodash-es';
import React from 'react';
import { TIME_GAP } from './constants';
import { TimeRangeAsDayjs } from './types';
import { useSchedules } from './useSchedules';
import { useWorkingTime } from './useWorkingTime';
import { mergeTimeIntoDay, splitTimeRangeIntoTimeSlots } from './utils';

import './CalendarBody.scss';

export type CalendarProviderValue = {
  today: Dayjs;
  viewingWeek: Dayjs;
  availableTimeRangesByDay: TimeRangeAsDayjs[][];
  viewPreviousWeek: () => void;
  viewNextWeek: () => void;
  viewThisWeek: () => void;
};

const [Provider, useCalendarContext] = createContext<CalendarProviderValue>();

export type CalendarProviderProps = Children & {
  //
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const today = React.useMemo(() => trimTime(dayjs()), []);
  const [viewingWeek, setViewingWeek] = React.useState(React.useMemo(() => today.day(0), [today]));

  const viewPreviousWeek = React.useCallback(() => {
    setViewingWeek(viewingWeek.date(viewingWeek.date() - 7));
  }, [viewingWeek]);

  const viewNextWeek = React.useCallback(() => {
    setViewingWeek(viewingWeek.date(viewingWeek.date() + 7));
  }, [viewingWeek]);

  const viewThisWeek = React.useCallback(() => {
    setViewingWeek(today.day(0));
  }, [today]);

  const { workingTime } = useWorkingTime();

  const { schedules } = useSchedules();

  const schedulesSplitByGap = React.useMemo(
    () =>
      schedules
        .map(({ endDate, endTime, startDate, startTime }) =>
          splitTimeRangeIntoTimeSlots(
            mergeTimeIntoDay(dayjs(startDate), startTime),
            mergeTimeIntoDay(dayjs(endDate), endTime),
          ),
        )
        .flat()
        .reduce((acc, cur) => ({ ...acc, [cur.toString()]: true }), {} as Record<string, boolean>),
    [schedules],
  );

  const availableTimeRangesByDay = React.useMemo(() => {
    return range(7).map((day) => {
      const workingTimeRange: TimeRangeAsDayjs = {
        startTime: mergeTimeIntoDay(dayjs(viewingWeek.day(day)), workingTime[day].startTime),
        endTime: mergeTimeIntoDay(dayjs(viewingWeek.day(day)), workingTime[day].endTime),
      };

      const workingTimeRangeSplitByGap = splitTimeRangeIntoTimeSlots(
        workingTimeRange.startTime,
        workingTimeRange.endTime,
      );

      const availableTimeSlots = workingTimeRangeSplitByGap.filter(
        (slot) => !schedulesSplitByGap[slot.toString()],
      );

      if (availableTimeSlots.length < 2) return [];

      // Calculate ranges from available slots
      const result: TimeRangeAsDayjs[] = [];
      let startTime = availableTimeSlots[0];

      availableTimeSlots.slice(1).forEach((slot, index) => {
        const previousSlot = availableTimeSlots[index];

        if (slot.diff(previousSlot, 'minute') > TIME_GAP) {
          result.push({ startTime, endTime: previousSlot.add(TIME_GAP, 'minute') });
          startTime = slot;
        }
      });

      result.push({
        startTime,
        endTime: availableTimeSlots[availableTimeSlots.length - 1].add(15, 'minute'),
      });

      return result;
    });
  }, [schedulesSplitByGap, viewingWeek, workingTime]);

  const value = React.useMemo<CalendarProviderValue>(
    () => ({
      today,
      viewingWeek,
      availableTimeRangesByDay,
      viewNextWeek,
      viewPreviousWeek,
      viewThisWeek,
    }),
    [today, viewingWeek, availableTimeRangesByDay, viewNextWeek, viewPreviousWeek, viewThisWeek],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { useCalendarContext };
