import React, { useState } from "react";

interface SideNavProps {
  onFilter: (department: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false); // Add state for sidebar

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#1e0635] text-white rounded-md shadow-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e0635] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        {/* Sidebar Content */}
        <div className="p-6 mt-10">
          <h2 className="text-lg font-bold mb-4">Filter by Department</h2>
          <ul className="space-y-2">
            {[
              "All Departments",
              "Physical Sciences",
              "AIML",
              "Food Processing Technology",
              "Civil Engineering",
              "Mechanical",
              "EEE",
            ].map((department) => (
              <li
                key={department}
                className="cursor-pointer p-2 hover:bg-purple-700 rounded transition"
                onClick={() => {
                  onFilter(department);
                  setIsOpen(false);
                }}
              >
                {department}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideNav;
