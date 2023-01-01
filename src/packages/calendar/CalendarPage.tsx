import React from 'react';

import { CalendarHeader } from './CalendarHeader';
import { CalendarBody } from './CalendarBody';
import { CalendarProvider } from './CalendarProvider';

import './CalendarPage.scss';
import './variables.scss';
import { CalendarNavigator } from './CalendarNavigator';
import { MainLayout } from '@/layout/MainLayout';

export type CalendarPageProps = {
  //
};

const CalendarPage = ({}: CalendarPageProps) => {
  return (
    <MainLayout className="calendar-page">
      <CalendarProvider>
        <CalendarNavigator />
        <CalendarHeader />
        <CalendarBody />
      </CalendarProvider>
    </MainLayout>
  );
};

export default CalendarPage;
