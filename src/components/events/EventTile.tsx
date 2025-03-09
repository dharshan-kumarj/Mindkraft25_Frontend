import React from 'react';
import { Event } from '../../types/events';

interface EventTileProps {
  event: Event;
  onClick: (eventId: string) => void;
}

const EventTile: React.FC<EventTileProps> = ({ event, onClick }) => {
  return (
    <div 
      className="relative bg-[#1e0635] border border-gray-700 backdrop-blur-lg bg-opacity-40 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 hover:border-purple-500 cursor-pointer duration-300"
      onClick={() => onClick(event.eventid)}
    >
      {/* Neon Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent hover:border-purple-500 rounded-lg transition-all duration-300"></div>

      {/* Event Title */}
      <h3 className="text-lg font-bold mb-3 text-white">{event.eventname}</h3>

      {/* Event Details */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Event Date */}
        <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
          📅 {new Date(event.start_time).toLocaleDateString('en-GB')}
        </span>

        {/* Event Time */}
        <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
          ⏰ {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {/* Participant Limit */}
        <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
          👥 {event.participation_strength_setlimit}
        </span>

        {/* Event Category */}
        <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
          {event.category_name}
        </span>

        {/* Price */}
        <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
          💰 ₹{event.price}
        </span>
      </div>

      {/* Register Button */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
        View Details
      </button>
    </div>
  );
};



export default EventTile;