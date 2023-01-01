import React from 'react';

import '@/common/styles/index.scss';

const CalendarPage = React.lazy(() => import('@/calendar/CalendarPage'));

export function App() {
  return <CalendarPage />;
}
