import React, { useState } from "react";
import EventsList from "../../components/events/EventsList";
import EventDetails from "../../components/events/EventDetails";
import SideNav from "../../components/events/sidenav";
import { useNavigate } from "react-router-dom";

const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEventSelect = (eventId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedEvent(eventId);
      setIsLoading(false);
    }, 500);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleFilterChange = (department: string) => {
    setDepartmentFilter(department);
    setIsSidebarOpen(false);
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed text-gray-100" 
      style={{ backgroundImage: "url('/src/assets/bg.png')" }} 
    >  
      {/* Navbar with Solid Background (Fixed White Layer Issue) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-[#1e0635] shadow-lg">
        
        {/* Sidebar Toggle Button */}
        <button
          className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-800 rounded-md shadow-md focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <img src="/src/assets/menu.png" width={30} height={30} alt="sidebar" />
        </button>

        {/* Event Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide text-center flex-1">
          MINDKRAFT 2K25
        </h1>

        {/* Cart Button */}
        <button
          onClick={() => navigate("/cart")}
          className="relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-full transition-all flex items-center"
        >
          <img src="/src/assets/cart.png" width={20} height={20} alt="" />
        </button>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1e0635] text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <SideNav onFilter={handleFilterChange} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 p-6 mt-[64px] transition-all duration-300 min-h-screen">
        {/* Keep EventsList always rendered */}
        <div className={`${selectedEvent ? "opacity-50 pointer-events-none" : ""}`}>
          <EventsList onEventClick={handleEventSelect} filter={departmentFilter} />
        </div>

        {/* Event Details as a Popup */}
        {selectedEvent && (
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-70 z-50">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
              </div>
            ) : (
              <EventDetails eventId={selectedEvent} onClose={closeEventDetails} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
