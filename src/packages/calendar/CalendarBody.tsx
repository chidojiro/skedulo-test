import clsx from 'clsx';
import { range, padStart } from 'lodash-es';
import { CalendarCell } from './CalendarCell';
import { useCalendarContext } from './CalendarProvider';
import { CALENDAR_ROW_HEIGHT } from './constants';
import { useWorkingTime } from './useWorkingTime';

import './CalendarBody.scss';
import { Dayjs } from 'dayjs';

export type CalendarBodyProps = {
  //
};

const TIME_GAP = 15; // In minutes

const timeMarkCount = 24 * (60 / TIME_GAP);

const compareTime = (time: string, day: Dayjs) => {
  const standardizedTime = padStart(time, 4, '0');

  const hour = +standardizedTime.slice(0, 2);
  const minute = +standardizedTime.slice(2);

  const dayFromTime = day.hour(hour).minute(minute);

  if (dayFromTime.valueOf() > day.valueOf()) return -1;

  if (dayFromTime.valueOf() < day.valueOf()) return 1;

  return 0;
};

export const CalendarBody = ({}: CalendarBodyProps) => {
  const { viewingWeek } = useCalendarContext();
  const { workingTime } = useWorkingTime();

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
            {range(7).map((dateOffset) => {
              const dateMark = viewingWeek.date(dateOffset).minute(timeOffset * TIME_GAP);

              return (
                <CalendarCell
                  key={dateOffset}
                  className={clsx(
                    'calendar-body__cell',
                    compareTime(workingTime[dateOffset.toString()].startTime, dateMark) === -1 &&
                      'calendar-body__cell--disabled',
                  )}
                  dateMark={dateMark}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
