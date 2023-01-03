import { trimTime } from '@/common/utils';
import { Dayjs } from 'dayjs';
import React from 'react';
import { CALENDAR_ROW_HEIGHT, TIME_GAP } from './constants';

import './CalendarTimeRange.scss';

export type CalendarTimeRangeProps = {
  startTime: Dayjs;
  endTime: Dayjs;
};

export const CalendarTimeRange = React.memo(({ startTime, endTime }: CalendarTimeRangeProps) => {
  return (
    <div
      key={startTime.toString()}
      className="calendar-time-range"
      style={{
        top: (startTime.diff(trimTime(startTime), 'minute') / TIME_GAP) * CALENDAR_ROW_HEIGHT,
        height: (endTime.diff(startTime, 'minute') / TIME_GAP) * CALENDAR_ROW_HEIGHT,
      }}
    >
      {startTime.format('hh:mm A')} - {endTime.format('hh:mm A')}
    </div>
  );
});

CalendarTimeRange.displayName = 'CalendarTimeRange';
