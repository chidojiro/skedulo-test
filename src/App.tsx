import React from 'react';

import '@/common/styles/index.scss';
import { MainLayout } from '@/layout/MainLayout';

const CalendarPage = React.lazy(() => import('@/calendar/CalendarPage'));

export function App() {
  return (
    <MainLayout>
      <CalendarPage />
    </MainLayout>
  );
}
