import { ChevronLeft, ChevronRight } from '@/common/icons';
import React from 'react';
import { useCalendarContext } from './CalendarProvider';

import './CalendarNavigator.scss';

export type CalendarNavigatorProps = {
  //
};

export const CalendarNavigator = ({}: CalendarNavigatorProps) => {
  const { viewingWeek, viewNextWeek, viewPreviousWeek, viewThisWeek } = useCalendarContext();

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
      <div className="calendar-navigator__viewing-month-label">
        {viewingWeek.format('MMM, YYYY')}
      </div>
    </div>
  );
};
