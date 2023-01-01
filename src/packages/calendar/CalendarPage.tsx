import React from 'react';

import { CalendarHeader } from './CalendarHeader';
import { CalendarProvider } from './CalendarProvider';

import './CalendarPage.scss';
import './variables.scss';

export type CalendarPageProps = {
  //
};

const CalendarPage = ({}: CalendarPageProps) => {
  return (
    <CalendarProvider>
      <div className="calendar-page">
        <CalendarHeader />
      </div>
    </CalendarProvider>
  );
};

export default CalendarPage;
