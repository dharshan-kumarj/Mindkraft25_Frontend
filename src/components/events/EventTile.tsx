import React from "react";

interface Event {
  eventid: string;
  eventname: string;
  description: string;
  type: string;
  category_name: string;
  start_time: string;
  end_time: string;
  price: string;
  participation_strength_setlimit: number;
}

interface EventTileProps {
  event: Event;
  onClick: (eventId: string) => void;
}

const EventTile: React.FC<EventTileProps> = ({ event, onClick }) => {
  return (
    <div
      className="relative bg-[#1e0635] border border-gray-700 backdrop-blur-lg bg-opacity-40 
                 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-transform 
                 transform hover:scale-105 hover:border-purple-500 cursor-pointer duration-300"
      onClick={() => onClick(event.eventid)}
    >
      {/* Neon Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-lg 
                      transition-all duration-300 hover:border-purple-500"></div>

      {/* Event Title */}
      <h3 className="text-lg font-bold mb-3 text-white">{event.eventname}</h3>

      {/* Event Details */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Event Date */}
        <EventTag icon="📅" text={new Date(event.start_time).toLocaleDateString("en-GB")} />
        
        {/* Event Time */}
        <EventTag 
          icon="⏰" 
          text={new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
        />

        {/* Participant Limit */}
        <EventTag icon="👥" text={event.participation_strength_setlimit} />

        {/* Event Category */}
        <EventTag icon="🏷️" text={event.category_name} />

        {/* Price */}
        <EventTag icon="💰" text={`₹${event.price}`} />
      </div>

      {/* Register Button */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                         hover:from-purple-700 hover:to-indigo-700 text-white font-medium 
                         py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
        View Details
      </button>
    </div>
  );
};

/** Reusable Tag Component for Event Details */
const EventTag: React.FC<{ icon?: string; text: string | number }> = ({ icon, text }) => (
  <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
    {icon && <span className="mr-1">{icon}</span>} {text}
  </span>
);

export default EventTile;
