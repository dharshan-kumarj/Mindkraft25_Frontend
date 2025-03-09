import React, { useState } from 'react';
import EventsList from '../../components/events/EventsList';
import EventDetails from '../../components/events/EventDetails';
import SideNav from '../../components/events/sidenav';

const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#12022f] to-[#29075e] text-gray-100">
      {/* Side Navigation */}
      <SideNav onFilter={setDepartmentFilter} />

      {/* Main Content */}
      <div className="ml-0 md:ml-64 transition-all duration-300">
        <h1 className="text-center text-3xl font-bold py-5">MINDKRAFT 2K25</h1>
        <div className="px-4 md:px-8">
          <EventsList filter={departmentFilter} onEventClick={handleEventSelect} />
        </div>
        {selectedEvent && (
          <EventDetails eventId={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
};

export default EventsPage;
