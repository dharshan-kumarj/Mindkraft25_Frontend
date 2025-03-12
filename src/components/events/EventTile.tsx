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
  participation_strength_setlimit: string;
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
                 transform hover:scale-105 hover:border-purple-500 cursor-pointer duration-300
                 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto"
      onClick={() => onClick(event.eventid)}
    >
      {/* Neon Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-lg 
                      transition-all duration-300 hover:border-purple-500"></div>

      {/* Event Title */}
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white text-center truncate">
        {event.eventname}
      </h3>

      {/* Event Details */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <EventTag icon="📅" text={new Date(event.start_time).toLocaleDateString("en-GB")} />
        <EventTag 
          icon="⏰" 
          text={new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
        />
        <EventTag icon="👥" text={event.participation_strength_setlimit || "No limit"} />
        <EventTag icon="🏷️" text={event.type === "tech" ? "Technical" : "Non-Technical"} />
        <EventTag icon="💰" text={event.price ? `₹${event.price}` : "Free"} />
      </div>

      {/* Register Button */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                         hover:from-purple-700 hover:to-indigo-700 text-white font-medium 
                         py-2 rounded-lg transition-all duration-300 shadow-lg 
                         hover:shadow-purple-500/50">
        View Details
      </button>
    </div>
  );
};

/** Reusable Tag Component for Event Details */
const EventTag: React.FC<{ icon?: string; text: string | number }> = ({ icon, text }) => (
  <span className="flex items-center justify-center bg-gray-800 px-3 py-1 rounded-full 
                   text-sm sm:text-base text-gray-300 w-full sm:w-auto truncate break-words">
    {icon && <span className="mr-1">{icon}</span>} {text}
  </span>
);

export default EventTile;
