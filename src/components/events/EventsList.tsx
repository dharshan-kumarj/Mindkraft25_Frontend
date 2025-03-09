import React from 'react';
import EventTile from './EventTile';
import { eventsData } from '../../types/data';

interface EventsListProps {
  filter: string;
  onEventClick: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ filter, onEventClick }) => {
  const filteredEvents = filter === 'all' ? eventsData : eventsData.filter(event => event.division === filter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {filteredEvents.map(event => (
        <EventTile key={event.eventid} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
};

export default EventsList;