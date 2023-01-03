import clsx from 'clsx';
import { range } from 'lodash-es';
import { CalendarCell } from './CalendarCell';
import { useCalendarContext } from './CalendarProvider';
import { CALENDAR_ROW_HEIGHT, timeSlotCount, TIME_GAP } from './constants';

import './CalendarBody.scss';
import { CalendarTimeRange } from './CalendarTimeRange';
import { useExtraAvailability } from './useExtraAvailability';
import { mergeTimeIntoDay } from './utils';
import dayjs from 'dayjs';
import React from 'react';

export type CalendarBodyProps = {
  //
};

export const CalendarBody = ({}: CalendarBodyProps) => {
  const [selectedRange, setSelectedRange] = React.useState<string>();
  const { viewingWeek, availableTimeRangesByDay } = useCalendarContext();

  const { data: extraAvailability } = useExtraAvailability();

  return (
    <div className="calendar-body">
      <div className="calendar-body__available-time-ranges-row">
        {range(7).map((day) => (
          <div key={day} className="calendar-body__available-time-range-container">
            {availableTimeRangesByDay[day].map(({ startTime, endTime }, index) => (
              <CalendarTimeRange
                key={startTime.toString()}
                startTime={startTime}
                endTime={endTime}
                onClick={() => setSelectedRange(`default-${index}`)}
                selected={selectedRange === `default-${index}`}
              />
            ))}
            {(extraAvailability ?? []).map(({ startTime, endTime, startDate, endDate }, index) => {
              const isSameDay = viewingWeek.day(day).format('YYYY-MM-DD') !== startDate;

              if (isSameDay) return null;

              return (
                <CalendarTimeRange
                  key={startTime.toString()}
                  startTime={mergeTimeIntoDay(dayjs(startDate), startTime)}
                  endTime={mergeTimeIntoDay(dayjs(endDate), endTime)}
                  onClick={() => setSelectedRange(`extra-${index}`)}
                  selected={selectedRange === `extra-${index}`}
                  isExtra
                />
              );
            })}
          </div>
        ))}
      </div>
      <div>
        {range(timeSlotCount).map((timeOffset) => {
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
              {range(7).map((dateOffset) => {
                const dateMark = viewingWeek.add(dateOffset, 'day').minute(timeOffset * TIME_GAP);

                return (
                  <CalendarCell
                    key={dateOffset}
                    className="calendar-body__cell"
                    dateMark={dateMark}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
