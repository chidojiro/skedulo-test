import { ChevronLeft, ChevronRight } from '@/common/icons';
import React from 'react';
import { useCalendarContext } from './CalendarProvider';

import './CalendarNavigator.scss';

export type CalendarNavigatorProps = {
  //
};

export const CalendarNavigator = ({}: CalendarNavigatorProps) => {
  const { viewingWeek, viewNextWeek, viewPreviousWeek, viewThisWeek } = useCalendarContext();

  const renderViewingWeekLabel = () => {
    const sunday = viewingWeek;
    const saturday = viewingWeek.day(6);

    if (sunday.month() === saturday.month()) {
      return sunday.format('MMM, YYYY');
    }

    if (sunday.year() !== saturday.year()) {
      return `${sunday.format('MMM, YYYY')} - ${saturday.format('MMM, YYYY')}`;
    }

    if (sunday.month() !== saturday.month()) {
      return `${sunday.format('MMM')} - ${saturday.day(6).format('MMM')}, ${sunday.format('YYYY')}`;
    }

    return sunday.format('MMM, YYYY');
  };

  return (
    <div className="calendar-navigator">
      <button className="calendar-navigator__today" onClick={viewThisWeek}>
        Today
      </button>
      <div className="calendar-navigator__chevrons">
        <button className="calendar-navigator__chevron" onClick={viewPreviousWeek}>
          <ChevronLeft />
        </button>
        <button className="calendar-navigator__chevron" onClick={viewNextWeek}>
          <ChevronRight />
        </button>
      </div>
      <div className="calendar-navigator__viewing-month-label">{renderViewingWeekLabel()}</div>
    </div>
  );
};
