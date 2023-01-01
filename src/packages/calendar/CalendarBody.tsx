import React from 'react';

import { range } from 'lodash-es';

import './CalendarBody.scss';
import dayjs from 'dayjs';
import { CALENDAR_ROW_HEIGHT } from './constants';
import { useCalendarContext } from './CalendarProvider';
import { CalendarCell } from './CalendarCell';
import clsx from 'clsx';

export type CalendarBodyProps = {
  //
};

const TIME_GAP = 15; // In minutes

const timeMarkCount = 24 * (60 / TIME_GAP);

export const CalendarBody = ({}: CalendarBodyProps) => {
  const { viewingWeek } = useCalendarContext();

  return (
    <div className="calendar-body">
      {range(timeMarkCount).map((timeOffset) => {
        const timeMark = viewingWeek.minute(timeOffset * TIME_GAP);

        return (
          <div
            key={timeOffset}
            className="calendar-body__row"
            style={{ height: CALENDAR_ROW_HEIGHT }}
          >
            <div
              className={clsx(
                'calendar-body__time-mark',
                timeMark.minute() === 0 && 'calendar-body__time-mark--primary',
              )}
            >
              {timeMark.format('hh:mm A')}
            </div>
            {range(7).map((dateOffset) => (
              <CalendarCell
                key={dateOffset}
                className="calendar-body__cell"
                timeMark={viewingWeek.date(dateOffset).minute(timeOffset * TIME_GAP)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
