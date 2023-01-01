import React from 'react';

import { CalendarHeader } from './CalendarHeader';
import { CalendarBody } from './CalendarBody';
import { CalendarProvider } from './CalendarProvider';

import './CalendarPage.scss';
import './variables.scss';
import { CalendarNavigator } from './CalendarNavigator';

export type CalendarPageProps = {
  //
};

const CalendarPage = ({}: CalendarPageProps) => {
  return (
    <CalendarProvider>
      <div className="calendar-page">
        <CalendarNavigator />
        <CalendarHeader />
        <CalendarBody />
      </div>
    </CalendarProvider>
  );
};

export default CalendarPage;
