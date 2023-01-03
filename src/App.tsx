import React from 'react';

import '@/common/styles/index.scss';
import { ErrorBoundary } from '@/common/components';

const CalendarPage = React.lazy(() => import('@/calendar/CalendarPage'));

export function App() {
  return (
    <ErrorBoundary>
      <CalendarPage />
    </ErrorBoundary>
  );
}
