import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// import '@fullcalendar/react/dist/vdom'; // React 18 이상에서 필요할 수도 있음
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';

const CalendarComponent = () => {
  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={[
        { title: 'Event 1', date: '2024-06-01' },
        { title: 'Event 2', date: '2024-06-07' }
      ]}
    />
  );
}

export default CalendarComponent;