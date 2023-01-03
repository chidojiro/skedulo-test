import clsx from 'clsx';
import { range } from 'lodash-es';
import { CalendarCell } from './CalendarCell';
import { useCalendarContext } from './CalendarProvider';
import { CALENDAR_ROW_HEIGHT, TIME_GAP } from './constants';

import './CalendarBody.scss';
import { trimTime } from '@/common/utils';
import { CalendarTimeRange } from './CalendarTimeRange';

export type CalendarBodyProps = {
  //
};

const timeMarkCount = 24 * (60 / TIME_GAP);

export const CalendarBody = ({}: CalendarBodyProps) => {
  const { viewingWeek, availableTimeRangesByDay } = useCalendarContext();

  return (
    <div className="calendar-body">
      <div className="calendar-body__available-time-ranges-row">
        {range(7).map((day) => (
          <div key={day} className="calendar-body__available-time-range-container">
            {availableTimeRangesByDay[day].map(({ startTime, endTime }) => (
              <CalendarTimeRange
                key={startTime.toString()}
                startTime={startTime}
                endTime={endTime}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
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
              {range(7).map((dateOffset) => {
                const dateMark = viewingWeek.date(dateOffset).minute(timeOffset * TIME_GAP);

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
