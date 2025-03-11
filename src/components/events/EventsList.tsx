// import React from "react";
// import EventTile from "./EventTile";

// interface Event {
//   eventid: string;
//   eventname: string;
//   description: string;
//   type: string;
//   category: number;
//   category_name: string;
//   division: string;
//   start_time: string;
//   end_time: string;
//   price: number | string;
//   participation_strength_setlimit: number | string;
//   coordinators?: {
//     student?: { name?: string; phone?: string; email?: string };
//     faculty?: { name?: string; phone?: string; email?: string };
//   };
// }

// interface EventsListProps {
//   filter: string;
//   onEventClick: (eventId: string) => void;
//   events: Event[];
// }

// const EventsList: React.FC<EventsListProps> = ({ filter, onEventClick, events }) => {
//   // Filter events based on the department filter
//   const filteredEvents = filter === "all" 
//     ? events 
//     : events.filter(event => event.division === filter);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
//       {filteredEvents.length > 0 ? (
//         filteredEvents.map((event) => (
//           <EventTile key={event.eventid} event={event} onClick={onEventClick} />
//         ))
//       ) : (
//         <p className="text-center text-gray-400 col-span-full">No events available for this department.</p>
//       )}
//     </div>
//   );
// };

// export default EventsList;