import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaTimes } from "react-icons/fa";

// If using images from "assets" folder
import karunyalogo from "../../public/assets/karunyalogo.webp";
import image1 from "../../public/assets/gallery1.png";
import image2 from "../../public/assets/gallery2.png";
import image3 from "../../public/assets/gallery3.png";
import image4 from "../../public/assets/gallery4.png";
import image5 from "../../public/assets/gallery5.png";
import image6 from "../../public/assets/gallery6.png";
import image7 from "../../public/assets/gallery7.png";
import image8 from "../../public/assets/gallery8.png";
import image9 from "../../public/assets/gallery9.png";
import backgroundImage from "../../public/assets/bg.png"; // Add your background image here

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isCommitteeVisible, setIsCommitteeVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVideoBanner, setShowVideoBanner] = useState(true);

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

  // Show video banner on page reload
  useEffect(() => {
    setShowVideoBanner(true);
  }, []);

  // Hide video banner when clicking anywhere on the screen
  useEffect(() => {
    const handleClick = () => {
      setShowVideoBanner(false);
    };

    if (showVideoBanner) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showVideoBanner]);

  // Calculate blur intensity based on scroll position
  const blurIntensity = Math.min(scrollY / 50, 10); // Adjust the divisor for sensitivity

  return (
    <div className="relative text-white">
      {/* Video Banner */}
      {showVideoBanner && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent" 
          style={{ top: '10%' }}
        >
          <div className="w-[100%] max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl">
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              onClick={(e) => e.stopPropagation()}
            >
              <source src="public/assets/banner.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Rest of the code remains the same */}
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-opacity-30 backdrop-blur-lg">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={karunyalogo}
            alt="Mindkraft Logo"
            className="h-12 w-auto md:h-14"
          />
        </div>

        {/* Title */}
        <div className="w-full md:w-auto text-center md:text-left">
          <a href="/">
            <h1 className="text-lg md:text-2xl font-bold tracking-wide">
              MINDKRAFT 2K25
            </h1>
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-1.5 text-sm rounded-full bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 text-sm rounded-full bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaAngleDown />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-6 w-40 bg-opacity-90 text-white rounded-lg shadow-lg py-3 flex flex-col space-y-2">
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
              className="px-5 py-2 text-sm hover:bg-blue-600 transition"
            >
              Register
            </button>
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="px-5 py-2 text-sm hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        )}
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
      // Add this section above the Gallery Section
      <div className="min-h-screen flex flex-col items-center justify-center bg-opacity-20 py-16 relative z-10">
  <div className="w-full max-w-6xl px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
      Instructions for Internal & External Participants
    </h2>
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-left text-gray-300 space-y-4">
      <p>
        <strong>Step 1:</strong> Register at{" "}
        <a
          href="https://mindkraft.org/#/register"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Mindkraft
        </a>{" "}
        → Click Register → Login.
      </p>
      <p>
        <strong>Step 2:</strong> Explore Events at{" "}
        <a
          href="https://mindkraft.org/#/events"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Mindkraft Events
        </a>{" "}
        → Click View Details → Register Now → You will be redirected to the Eduserve portal for further registration.
      </p>
      <p>
        <strong>Step 3:</strong> For paid events, you will be redirected to the Eduserve portal for payment processing. Multiple paid event registrations are allowed.
      </p>
      <p>
        <strong>Step 4:</strong> Mindkraft 2025 - Main Registration Fee (External Participants):
      </p>
      <ul className="list-disc list-inside pl-4">
        <li>
          Select Event Name in Eduserve as{" "}
          <strong>MK25E0001 - Registration (External Participants)</strong>.
        </li>
        <li>Registration Fee: <strong>Rs. 400 (Mandatory)</strong>.</li>
      </ul>
      <p>
        <strong>Step 5:</strong> Mindkraft 2025 - Main Registration Fee (Internal Participants):
      </p>
      <ul className="list-disc list-inside pl-4">
        <li>
          Select Event Name in Eduserve as{" "}
          <strong>MK25E0002 - Registration (Internal Participants)</strong>.
        </li>
        <li>Registration Fee: <strong>Rs. 250 (Mandatory)</strong>.</li>
      </ul>
      <p>
        <strong>Step 6:</strong> Registration for non-paid events can be completed directly on the{" "}
        <a
          href="https://mindkraft.org/#/events"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Mindkraft Events Page
        </a>
        . These events will not redirect to the Eduserve portal.
      </p>
    </div>
  </div>
</div>

      {/* Gallery Section - Next Page */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-opacity-20 py-16 relative z-10">
        <div className="w-full max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <img
              src={image1}
              alt="Gallery Image 1"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image2}
              alt="Gallery Image 2"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image3}
              alt="Gallery Image 3"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image4}
              alt="Gallery Image 4"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image5}
              alt="Gallery Image 5"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image6}
              alt="Gallery Image 6"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image7}
              alt="Gallery Image 7"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image8}
              alt="Gallery Image 8"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src={image9}
              alt="Gallery Image 9"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Committee Section - Next Page */}
      <div
        id="committee-section"
        className={`min-h-screen flex flex-col items-center justify-center bg-opacity-20 py-16 relative z-10 transition-opacity duration-1000 ease-out ${
          isCommitteeVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
        }`}
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          COMMITTEE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-6">
          {/* Committee Items */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Patron</h3>
            <p className="text-gray-300">Dr. Paul Dhinakaran, Chancellor</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Co-Patron</h3>
            <p className="text-gray-300">
              Mr. Samuel Paul Dhinakaran,Vice President
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">President</h3>
            <p className="text-gray-300">
              Dr. G. Prince Arulraj, Vice Chancellor
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Vice Presidents</h3>
            <p className="text-gray-300">
              Dr. R. Elijah Blessing, Pro-Vice Chancellor (AIC)
            </p>
            <p className="text-gray-300">Dr. S. J. Vijay, Registrar</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Convenor</h3>
            <p className="text-gray-300">
              Dr. Jibu Thomas, Professor & HoD Biotechnology
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Organizing Secretaries</h3>
            <p className="text-gray-300">
              Dr. E. Grace Mary Kanaga, HoD, DS&CS
            </p>
            <p className="text-gray-300">
              Dr. R. Raja, Associate Professor, Mechanical Engineering
            </p>
            <p className="text-gray-300">
              Dr. Bazil Wilfred C, Asst. Prof. Maths
            </p>
          </div>
        </div>

        {/* New Grid Box - Centered and Wider */}
        <div className="flex justify-center w-full mt-8">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center shadow-lg w-full max-w-6xl">
            <h3 className="text-2xl font-bold mb-4">Steering Committee</h3>
            <div className="text-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <p>Dr. C. Joseph Kennady, Dean (SSAM),</p>
              <p>Dr. Sajan Kurien, Dean (SAS),</p>
              <p>Dr. J. Clement Sudhahar, Dean (KSM),</p>
              <p>Dr. D. Nirmal, Associate Dean (SET),</p>
              <p>Dr. D. Tensing, Director (QAA),</p>
              <p>Dr. K.R.S. Krishnan, Director (IE),</p>
              <p>CA. A. Joseph Amulraj, Finance Officer,</p>
              <p>Dr. S. Albones Raj, Director, Student Affairs,</p>
              <p>Dr. Suresh Mathew, Director (Research & Consultancy),</p>
              <p>Dr. Thomas George, Dy-Director (Research & Consultancy),</p>
              <p>Dr. Madhu Ganesh, Director (Twinning Programme),</p>
              <p>Mr. G. John Edison, Director (Training & Placement),</p>
              <p>Dr. B. Jefferson Raja Bose, CoE,</p>
              <p>Dr. Jims John Wesley, Officer on Special Duty,</p>
              <p>Mr. Henriksen G. Balraj, Administrative Officer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
<footer className="bg-gray-800 bg-opacity-50 py-6 relative z-10">
  <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
    <p className="text-gray-300">
      &copy; {new Date().getFullYear()} Mindkraft 2K25. All rights reserved.
    </p>
    <p className="text-gray-300">
      Contact: <a href="mailto:mindkraft@karunya.edu.in" className="text-blue-400 hover:underline">mindkraft@karunya.edu.in</a>
    </p>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;