import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";

interface Event {
  eventid: string;
  eventname: string;
  description: string;
  type: string;
  category: number;
  category_name: string;
  division: string;
  start_time: string;
  end_time: string;
  price: string;
  participation_strength_setlimit: number;
}

interface EventsListProps {
  filter: string;
  onEventClick: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ filter, onEventClick }) => {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://mindkraft25-backend.onrender.com/api/events/")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setEventsData(data.data);
        } else {
          setError("Unexpected response format");
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading events...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  // 🔹 Fix: Ensure "All Departments" shows all events
  const filteredEvents = (filter === "all" || filter === "All Departments")
    ? eventsData
    : eventsData.filter((event) => event.division === filter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventTile key={event.eventid} event={event} onClick={onEventClick} />
        ))
      ) : (
        <p className="text-center text-gray-400 col-span-full">No events available.</p>
      )}
    </div>
  );
};

export default EventsList;
