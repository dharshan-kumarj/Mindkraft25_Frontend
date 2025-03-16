import React, { useEffect, useState } from "react";
import bgImage from "/assets/login_bg.webp";
import karunyalogo from "/assets/karunyalogo.webp";
import * as XLSX from "xlsx";

// Interface for the API response structure
interface RegisteredEvent {
  id: number;
  event_name: string;
  payment_status: boolean;
  registered_at: string;
  updated_at: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    register_no: string;
    mobile_no: string;
    mkid: string;
    intercollege: boolean;
    is_enrolled: boolean;
    student: {
      college_name: string;
      branch: string;
      dept: string;
      year_of_study: number;
      tshirt: boolean;
    } | null;
  };
  student: {
    college_name: string;
    branch: string;
    dept: string;
    year_of_study: number;
    tshirt: boolean;
  } | null;
  event_details: {
    eventid: string;
    eventname: string;
    category_name: string;
    division: string;
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: RegisteredEvent[];
}

const AdminPage: React.FC = () => {
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      setLoading(true);
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken"))
          ?.split("=")[1];

        if (!token) {
          console.error("Access token not found.");
          setUnauthorized(true);
          setError("You are not authorized to view this page. Please log in with admin credentials.");
          setLoading(false);
          return;
        }

        console.log("Token Retrieved:", token);

        const response = await fetch("http://localhost:8000/api/all-registered-events/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          setUnauthorized(true);
          setError("You are not authorized to view this page. Please log in with admin credentials.");
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        console.log("API Response:", result);

        if (result && result.status === "success" && result.data) {
          setRegisteredEvents(result.data);
        } else {
          console.error("Unexpected response structure:", result);
          setError("Failed to fetch data. Unexpected response structure.");
        }
      } catch (error) {
        console.error("Error fetching registered events:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  const getCollegeName = (event: RegisteredEvent) => {
    // Try to get college name from student field, or from user.student, or return '-'
    return event.student?.college_name || event.user.student?.college_name || '-';
  };

  const exportToExcel = () => {
    // Format the data for Excel export
    const excelData = registeredEvents.map(event => ({
      'MKID': event.user.mkid,
      'Name': `${event.user.first_name} ${event.user.last_name}`,
      'Email': event.user.email,
      'Register No': event.user.register_no === "dummy" ? "-" : event.user.register_no,
      'Mobile': event.user.mobile_no,
      'Type': event.user.intercollege ? "External" : "Internal",
      'College': getCollegeName(event),
      'Event Name': event.event_details.eventname,
      'Event Category': event.event_details.category_name,
      'Status': event.payment_status ? "Registered" : "Not Registered",
      'Registered At': new Date(event.registered_at).toLocaleString(),
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registered Events");

    // Generate Excel file and download
    const currentDate = new Date().toISOString().slice(0, 10);
    const filename = `MindKraft_Registrations_${currentDate}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  // Unauthorized Access Error Page
  if (unauthorized) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-red-900 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-white mb-4"
            fill="none"
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <h2 className="text-2xl text-white font-bold mb-4">Unauthorized Access</h2>
          <p className="text-gray-300 mb-6">You don't have permission to access this admin page. Please log in with the appropriate credentials.</p>
          <div className="flex justify-center gap-4">
            <a 
              href="/#/login" 
              className="bg-white text-red-900 hover:bg-gray-200 font-bold py-2 px-4 rounded"
            >
              Log In
            </a>
            <a 
              href="/#/" 
              className="bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 font-bold py-2 px-4 rounded"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Normal Admin Page
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Navbar */}
      <a href="/#/">
        <nav className="absolute top-5 left-5 right-5 flex items-center justify-between p-4 bg-opacity-75 rounded-lg shadow-lg">
          <img src={karunyalogo} alt="Karunya Logo" className="h-12 w-12 md:h-16 md:w-16 object-cover" />
          <h1 className="text-white text-2xl font-bold">MINDKRAFT 2025</h1>
          <div></div>
        </nav>
      </a>

      {/* Admin Section */}
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg mt-20 w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white font-bold">All Registered Non-Paid Events of all students</h2>
          
          {!loading && !error && registeredEvents.length > 0 && (
            <button 
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download as Excel
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : registeredEvents.length === 0 ? (
          <div className="text-center text-gray-300">
            <p>No registered events found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 bg-opacity-70 rounded-lg">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-white">MKID</th>
                  <th className="px-4 py-3 text-left text-white">Name</th>
                  <th className="px-4 py-3 text-left text-white">Email</th>
                  <th className="px-4 py-3 text-left text-white">Register No</th>
                  <th className="px-4 py-3 text-left text-white">Mobile</th>
                  <th className="px-4 py-3 text-left text-white">Internal/External</th>
                  <th className="px-4 py-3 text-left text-white">College</th>
                  <th className="px-4 py-3 text-left text-white">Event Name</th>
                  <th className="px-4 py-3 text-left text-white">Event Category</th>
                </tr>
              </thead>
              <tbody>
                {registeredEvents.map((event, index) => (
                  <tr 
                    key={event.id} 
                    className={`${index % 2 === 0 ? 'bg-gray-700 bg-opacity-30' : ''} hover:bg-gray-700 hover:bg-opacity-50`}
                  >
                    <td className="px-4 py-3 text-gray-300">{event.user.mkid}</td>
                    <td className="px-4 py-3 text-gray-300">{`${event.user.first_name} ${event.user.last_name}`}</td>
                    <td className="px-4 py-3 text-gray-300">{event.user.email}</td>
                    <td className="px-4 py-3 text-gray-300">{event.user.register_no === "dummy" ? "-" : event.user.register_no}</td>
                    <td className="px-4 py-3 text-gray-300">{event.user.mobile_no}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {event.user.intercollege ? (
                        <span className="text-yellow-400">External</span>
                      ) : (
                        <span className="text-blue-400">Internal</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{getCollegeName(event)}</td>
                    <td className="px-4 py-3 text-gray-300">{event.event_details.eventname}</td>
                    <td className="px-4 py-3 text-gray-300">{event.event_details.category_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;