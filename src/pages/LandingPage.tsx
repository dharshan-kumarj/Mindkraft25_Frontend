import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// If using images from "assets" folder
import karunyalogo from "../assets/karunyalogo.webp";
import image1 from "../assets/gallery1.png";
import image2 from "../assets/gallery2.png";
import image3 from "../assets/gallery3.png";
import image4 from "../assets/gallery4.png";
import image5 from "../assets/gallery5.png";
import image6 from "../assets/gallery6.png";
import image7 from "../assets/gallery7.png";
import image8 from "../assets/gallery8.png";
import image9 from "../assets/gallery9.png";
import backgroundImage from "../assets/bg.png"; // Add your background image here

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isCommitteeVisible, setIsCommitteeVisible] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check if the committee section is in the viewport
      const committeeSection = document.getElementById("committee-section");
      if (committeeSection) {
        const rect = committeeSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsCommitteeVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate blur intensity based on scroll position
  const blurIntensity = Math.min(scrollY / 50, 10); // Adjust the divisor for sensitivity

  return (
    <div className="relative text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-opacity-30 backdrop-blur-lg">
        <div className="flex items-center space-x-2">
          <img src={karunyalogo} alt="Mindkraft Logo" className="h-16 w-auto" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-center">MINDKRAFT 2K25</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: `blur(${blurIntensity}px)`, // Apply dynamic blur
          transition: "filter 0.2s ease-out", // Smooth transition
        }}
      ></div>

      {/* Hero Section - Full Page */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight">
          WELCOME TO MINDKRAFT 2K25
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-300 max-w-xl">
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

      {/* Gallery Section - Next Page */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-opacity-20 py-16 relative z-10">
        <div className="w-full max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <img src={image1} alt="Gallery Image 1" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image2} alt="Gallery Image 2" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image3} alt="Gallery Image 3" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image4} alt="Gallery Image 4" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image5} alt="Gallery Image 5" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image6} alt="Gallery Image 6" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image7} alt="Gallery Image 7" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image8} alt="Gallery Image 8" className="w-full h-auto rounded-lg shadow-lg" />
            <img src={image9} alt="Gallery Image 9" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Committee Section - Next Page */}
      <div
        id="committee-section"
        className={`min-h-screen flex flex-col items-center justify-center bg-opacity-20 py-16 relative z-10 transition-opacity duration-1000 ease-out ${
          isCommitteeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-white">COMMITTEE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-6">
          {/* Committee Items */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Patron</h3>
            <p className="text-gray-300">Dr. Paul Dhinakaran, Chancellor</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Co-Patron</h3>
            <p className="text-gray-300">Mr. Samuel Paul Dhinakaran, Vice President</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">President</h3>
            <p className="text-gray-300">Dr. G. Prince Arulraj, Vice Chancellor</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Vice Presidents</h3>
            <p className="text-gray-300">Dr. E.J. James, Pro-Vice Chancellor (SIR)</p>
            <p className="text-gray-300">Dr. Ridling Margaret Waller, Pro-Vice Chancellor (QS)</p>
            <p className="text-gray-300">Dr. R. Elijah Blessing, Pro-Vice Chancellor (AIC)</p>
            <p className="text-gray-300">Dr. S. J. Vijay, Registrar</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Convenor</h3>
            <p className="text-gray-300">Dr. Jibu Thomas, Professor & HoD Biotechnology</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Organizing Secretaries</h3>
            <p className="text-gray-300">Dr. E. Grace Mary Kanaga, HoD, DS&CS</p>
            <p className="text-gray-300">Dr. R. Raja, Associate Professor, Mechanical Engineering</p>
            <p className="text-gray-300">Dr. Bazil Wilfred C, Asst. Prof. Maths</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;