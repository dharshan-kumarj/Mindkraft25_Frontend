import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white bg-cover bg-center bg-no-repeat bg-gradient-to-br from-[#12022f] to-[#29075e]"

    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-16 py-4 bg-black bg-opacity-30 backdrop-blur-lg">
        <div className="flex items-center space-x-2">
          <img src="src/assets/karunyalogo.webp" alt="Mindkraft Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold tracking-wide">MINDKRAFT 2K25</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-800 transition-all"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-800 transition-all"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          WELCOME TO MINDKRAFT 2K25
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-300">
          Redefining Technology for Sustainable Synergies
        </p>
        <p className="text-xl md:text-2xl font-semibold text-yellow-400 mt-2">
          21 & 22 MARCH 2025
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/events")}
          className="mt-8 px-6 py-3 flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 hover:scale-105 transition-transform rounded-full shadow-lg"
        >
          <span>Explore Events</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

