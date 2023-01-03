import { trimTime } from '@/common/utils';
import { Dayjs } from 'dayjs';
import React from 'react';
import { CALENDAR_ROW_HEIGHT, TIME_GAP } from './constants';

import './CalendarTimeRange.scss';
import clsx from 'clsx';

export type CalendarTimeRangeProps = {
  startTime: Dayjs;
  endTime: Dayjs;
  isExtra?: boolean;
  selected?: boolean;
  onClick: () => void;
};

export const CalendarTimeRange = React.memo(
  ({ startTime, endTime, isExtra, selected, onClick }: CalendarTimeRangeProps) => {
    return (
      <div
        key={startTime.toString()}
        onClick={onClick}
        className={clsx(
          'calendar-time-range',
          isExtra && 'calendar-time-range--extra',
          selected && 'calendar-time-range--selected',
        )}
        style={{
          top: (startTime.diff(trimTime(startTime), 'minute') / TIME_GAP) * CALENDAR_ROW_HEIGHT,
          height: (endTime.diff(startTime, 'minute') / TIME_GAP) * CALENDAR_ROW_HEIGHT,
        }}
      >
        {startTime.format('hh:mm A')} - {endTime.format('hh:mm A')}
      </div>
    );
  },
);

CalendarTimeRange.displayName = 'CalendarTimeRange';
