import React from 'react';

import { CalendarHeader } from './CalendarHeader';
import { CalendarBody } from './CalendarBody';
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
        <CalendarBody />
      </div>
    </CalendarProvider>
  );
};

export default CalendarPage;
