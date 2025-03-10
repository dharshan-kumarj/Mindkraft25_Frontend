import React, { useEffect, useState } from "react";

interface Event {
  eventid: string;
  eventname: string;
  description: string;
  coordinators?: {
    student?: { name?: string };
    faculty?: { name?: string };
  };
  division: string;
  category_name: string;
  start_time: string;
  price: number;
  participation_strength_setlimit: number;
}

interface EventDetailsProps {
  eventId: string;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onClose }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event details for:", eventId);
        const response = await fetch(`https://mindkraft25-backend.onrender.com/api/events/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event details");

        const data = await response.json();
        console.log("Fetched event data:", data);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="text-center text-white">Loading event details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl text-white rounded-xl p-6 max-w-2xl w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-gray-300 transition"
        >
          &times;
        </button>

        {/* Event Name */}
        <h2 className="text-3xl font-extrabold text-white mb-4 text-center">{event.eventname}</h2>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-6 text-center">{event.description}</p>

        {/* Coordinator Info */}
        <div className="grid grid-cols-2 gap-6 text-center mb-6">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-md">
            <p className="text-gray-300 text-sm">Student Coordinator</p>
            <p className="text-white font-semibold">{event.coordinators?.student?.name || "Not available"}</p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-md">
            <p className="text-gray-300 text-sm">Staff Coordinator</p>
            <p className="text-white font-semibold">{event.coordinators?.faculty?.name || "Not available"}</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex justify-between items-center text-gray-200 text-sm px-4 mb-6">
          <p>
            <span className="text-white font-semibold">Division:</span> {event.division}
          </p>
          <p>
            <span className="text-white font-semibold">Category:</span> {event.category_name}
          </p>
          <p>
            <span className="text-white font-semibold">Start Time:</span> {event.start_time}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600/60 backdrop-blur-sm hover:bg-gray-700 rounded-lg transition shadow-md text-white"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700 rounded-lg transition shadow-md text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
