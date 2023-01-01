import React from 'react';
import dayjs from 'dayjs';
import { ClassName } from '@/common/types';
import clsx from 'clsx';

import './CalendarHeader.scss';
import { useCalendarContext } from './CalendarProvider';

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export type CalendarHeaderProps = ClassName & {
  //
};

export const CalendarHeader = ({ className }: CalendarHeaderProps) => {
  const { viewingWeek, today } = useCalendarContext();

  return (
    <div className={clsx('calendar-header', className)}>
      {dayLabels.map((label, index) => (
        <div key={label} className="calendar-header__cell">
          <div>
            <p className="calendar-header__cell-day">{label}</p>
            <p
              className={clsx(
                'calendar-header__cell-date',
                today.valueOf() === viewingWeek.day(index).valueOf() &&
                  'calendar-header__cell-date--today',
              )}
            >
              {viewingWeek.day(index).date()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
