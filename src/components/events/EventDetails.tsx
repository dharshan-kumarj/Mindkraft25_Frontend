import React, { useState } from "react";
import Cookies from 'js-cookie';

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
  participation_strength_setlimit: string;
  coordinators?: {
    student?: { name?: string, phone?: string, email?: string };
    faculty?: { name?: string, phone?: string, email?: string };
  };
}

interface EventDetailsProps {
  eventId: string;
  onClose: () => void;
  events: Event[];
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onClose, events }) => {
  const event = events.find(e => e.eventid === eventId);
  
  const [cartStatus, setCartStatus] = useState<{ loading: boolean; success: boolean; error: string | null }>({
    loading: false,
    success: false,
    error: null,
  });

  const addToCart = async () => {
    if (!event) return;

    setCartStatus({ loading: true, success: false, error: null });

    try {
      setTimeout(() => {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) throw new Error("Authentication token not found. Please log in again.");

        setCartStatus({ loading: false, success: true, error: null });

        setTimeout(() => {
          setCartStatus(prev => ({ ...prev, success: false }));
        }, 3000);
      }, 1000);
      
    } catch (err) {
      setCartStatus({ loading: false, success: false, error: (err as Error).message });

      setTimeout(() => {
        setCartStatus(prev => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  if (!event) return null;

  const formatDateTime = (dateTimeStr: string) => {
    try {
      return new Date(dateTimeStr).toLocaleString();
    } catch (e) {
      return dateTimeStr;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50 px-4">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl text-white rounded-xl p-6 max-w-2xl w-full sm:px-4 md:px-6 lg:px-8">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-4 text-white text-2xl hover:text-gray-300 transition">
          &times;
        </button>

        {/* Event Name */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 text-center break-words">{event.eventname}</h2>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-6 text-center break-words">{event.description}</p>

        {/* Coordinator Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center mb-6">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-md">
            <p className="text-gray-300 text-sm">Student Coordinator</p>
            <p className="text-white font-semibold">{event.coordinators?.student?.name || "Not available"}</p>
            {event.coordinators?.student?.phone !== "Not provided" && (
              <p className="text-white text-sm">{event.coordinators?.student?.phone}</p>
            )}
            {event.coordinators?.student?.email !== "Not provided" && (
              <p className="text-white text-sm break-words">{event.coordinators?.student?.email}</p>
            )}
          </div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-md">
            <p className="text-gray-300 text-sm">Staff Coordinator</p>
            <p className="text-white font-semibold">{event.coordinators?.faculty?.name || "Not available"}</p>
            {event.coordinators?.faculty?.phone !== "Not provided" && (
              <p className="text-white text-sm">{event.coordinators?.faculty?.phone}</p>
            )}
            {event.coordinators?.faculty?.email !== "Not provided" && (
              <p className="text-white text-sm break-words">{event.coordinators?.faculty?.email}</p>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-200 text-sm px-4 mb-6 space-y-2 sm:space-y-0">
          <p><span className="text-white font-semibold">Division:</span> {event.division}</p>
          <p><span className="text-white font-semibold">Category:</span> {event.category_name}</p>
          <p><span className="text-white font-semibold">Start Time:</span> {formatDateTime(event.start_time)}</p>
        </div>

        {/* Price & Capacity */}
        <div className="flex justify-between items-center text-gray-200 text-sm px-4 mb-6">
          <p><span className="text-white font-semibold">Price:</span> {event.price ? `₹${event.price}` : "Free"}</p>
          <p><span className="text-white font-semibold">Max Participants:</span> {event.participation_strength_setlimit || "No Limit"}</p>
        </div>

        {/* Event Type */}
        <div className="flex justify-center items-center text-gray-200 text-sm px-4 mb-6">
          <span className="bg-purple-600/60 px-4 py-2 rounded-full">
            {event.type === "tech" ? "Technical Event" : "Non-technical Event"}
          </span>
        </div>

        {/* Cart Status Notifications */}
        {cartStatus.success && <div className="mb-4 p-2 bg-green-600/80 text-white text-center rounded-lg">Event added to cart successfully!</div>}
        {cartStatus.error && <div className="mb-4 p-2 bg-red-600/80 text-white text-center rounded-lg">Error: {cartStatus.error}</div>}

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={onClose} className="px-6 py-2 bg-gray-600/60 hover:bg-gray-700 rounded-lg transition shadow-md text-white">
            Close
          </button>
          <button 
            onClick={addToCart} 
            disabled={cartStatus.loading} 
            className={`px-6 py-2 ${cartStatus.loading ? 'bg-purple-400/60' : 'bg-purple-600/80 hover:bg-purple-700'} rounded-lg transition shadow-md text-white flex items-center justify-center`}
          >
            {cartStatus.loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
