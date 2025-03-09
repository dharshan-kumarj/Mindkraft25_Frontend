import React from 'react';
import { eventsData } from '../../types/data';

interface EventDetailsProps {
  eventId: string;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onClose }) => {
  const event = eventsData.find(e => e.eventid === eventId);

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">{event.eventname}</h2>
        <p className="text-gray-300 mb-4">{event.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400">Student Coordinator:</p>
            <p className="text-white">{event.coordinators.student.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Staff Coordinator:</p>
            <p className="text-white">{event.coordinators.faculty.name}</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
            Add to Cart 
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;